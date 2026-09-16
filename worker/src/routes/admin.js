// worker/src/routes/admin.js
// All /api/admin/* routes — protected by requireAdmin middleware.

import { Hono } from 'hono';
import { getCollection } from '../services/mongodb.js';
import { deleteFromCloudinary, uploadToCloudinary } from '../services/cloudinary.js';
import { generateUniqueId } from '../services/idGenerator.js';
import {
  validateRegistration,
  validateFullName,
  validateAge,
  validateMobileNumber,
  validateDateOfBirth,
  validateGender,
  validateEmail,
  validateImageFile,
} from '../utils/validation.js';
import {
  requireAdmin,
  createToken,
  hashPassword,
  setAuthCookie,
  clearAuthCookie,
} from '../middleware/auth.js';

const admin = new Hono();

// ─── Rate limiting state (in-memory, per-isolate) ─────────────────────────────
const loginAttempts = new Map(); // ip -> { count, resetAt }

function checkLoginRateLimit(ip) {
  const now = Date.now();
  const entry = loginAttempts.get(ip);

  if (entry && entry.resetAt > now) {
    if (entry.count >= 5) {
      const retryAfter = Math.ceil((entry.resetAt - now) / 1000);
      return { limited: true, retryAfter };
    }
    entry.count++;
    return { limited: false };
  }

  // Reset window
  loginAttempts.set(ip, { count: 1, resetAt: now + 15 * 60 * 1000 });
  return { limited: false };
}

// ─── POST /api/admin/login ────────────────────────────────────────────────────
admin.post('/login', async (c) => {
  const ip = c.req.header('CF-Connecting-IP') || c.req.header('X-Real-IP') || 'unknown';

  const rateCheck = checkLoginRateLimit(ip);
  if (rateCheck.limited) {
    return c.json({
      success: false,
      message: `Too many login attempts. Please try again in ${rateCheck.retryAfter} seconds.`,
    }, 429);
  }

  let body;
  try {
    body = await c.req.json();
  } catch {
    return c.json({ success: false, message: 'Invalid request body.' }, 400);
  }

  const { username, password } = body;

  if (!username || !password) {
    return c.json({ success: false, message: 'Username and password are required.' }, 400);
  }

  // Compare username
  const adminUsername = c.env.ADMIN_USERNAME || 'admin';
  if (username !== adminUsername) {
    return c.json({ success: false, message: 'Invalid credentials.' }, 401);
  }

  // Compare hashed password
  const adminPasswordHash = c.env.ADMIN_PASSWORD_HASH;
  if (!adminPasswordHash) {
    return c.json({ success: false, message: 'ADMIN_PASSWORD_HASH is not configured in environment.' }, 500);
  }

  const inputHash = await hashPassword(password);
  if (inputHash.toLowerCase() !== adminPasswordHash.toLowerCase()) {
    return c.json({ success: false, message: 'Invalid credentials.' }, 401);
  }

  // Create JWT
  const secret = c.env.SESSION_SECRET;
  if (!secret) {
    return c.json({ success: false, message: 'SESSION_SECRET is not configured in environment.' }, 500);
  }

  const token = await createToken({ username, role: 'admin' }, secret);

  // Set HTTP-only cookie
  setAuthCookie(c, token);

  return c.json({ success: true, message: 'Login successful.' });
});

// ─── POST /api/admin/logout ───────────────────────────────────────────────────
admin.post('/logout', requireAdmin, async (c) => {
  clearAuthCookie(c);
  return c.json({ success: true, message: 'Logged out successfully.' });
});

// ─── GET /api/admin/me ────────────────────────────────────────────────────────
admin.get('/me', requireAdmin, async (c) => {
  const admin = c.get('admin');
  return c.json({ success: true, data: { username: admin.username, role: admin.role } });
});

// ─── GET /api/admin/stats ─────────────────────────────────────────────────────
admin.get('/stats', requireAdmin, async (c) => {
  try {
    const collection = await getCollection(c.env);

    const now = new Date();

    // Start of today (IST)
    const todayStart = new Date(now);
    todayStart.setHours(0, 0, 0, 0);

    // Start of this month
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    const [total, todayCount, monthCount] = await Promise.all([
      collection.countDocuments({}),
      collection.countDocuments({ createdAt: { $gte: todayStart } }),
      collection.countDocuments({ createdAt: { $gte: monthStart } }),
    ]);

    return c.json({
      success: true,
      data: {
        total,
        today: todayCount,
        thisMonth: monthCount,
      },
    });
  } catch (err) {
    console.error('Stats error:', err);
    return c.json({ success: false, message: 'Could not fetch statistics.' }, 500);
  }
});

// ─── GET /api/admin/registrations ─────────────────────────────────────────────
// Query params: page, limit, search, dateFrom, dateTo
admin.get('/registrations', requireAdmin, async (c) => {
  try {
    const collection = await getCollection(c.env);

    const page = Math.max(1, parseInt(c.req.query('page') || '1', 10));
    const limit = Math.min(100, Math.max(1, parseInt(c.req.query('limit') || '20', 10)));
    const search = c.req.query('search') || '';
    const dateFrom = c.req.query('dateFrom') || '';
    const dateTo = c.req.query('dateTo') || '';

    const filter = {};

    // Search
    if (search) {
      filter.$or = [
        { uniqueId: { $regex: search, $options: 'i' } },
        { fullName: { $regex: search, $options: 'i' } },
        { mobileNumber: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    // Date range filter
    if (dateFrom || dateTo) {
      filter.createdAt = {};
      if (dateFrom) filter.createdAt.$gte = new Date(dateFrom);
      if (dateTo) {
        const to = new Date(dateTo);
        to.setHours(23, 59, 59, 999);
        filter.createdAt.$lte = to;
      }
    }

    const skip = (page - 1) * limit;

    const [records, total] = await Promise.all([
      collection
        .find(filter, {
          projection: {
            _id: 0,
            uniqueId: 1,
            fullName: 1,
            position: 1,
            age: 1,
            mobileNumber: 1,
            dateOfBirth: 1,
            gender: 1,
            email: 1,
            city: 1,
            photoUrl: 1,
            createdAt: 1,
          },
        })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .toArray(),
      collection.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(total / limit);

    return c.json({
      success: true,
      data: records,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    });
  } catch (err) {
    console.error('List registrations error:', err);
    return c.json({ success: false, message: 'Could not fetch registrations.' }, 500);
  }
});

// ─── GET /api/admin/registrations/:uniqueId ───────────────────────────────────
admin.get('/registrations/:uniqueId', requireAdmin, async (c) => {
  const uniqueId = c.req.param('uniqueId');

  try {
    const collection = await getCollection(c.env);

    const member = await collection.findOne(
      { uniqueId },
      { projection: { _id: 0, photoPublicId: 0 } }
    );

    if (!member) {
      return c.json({ success: false, message: 'Registration not found.' }, 404);
    }

    return c.json({ success: true, data: member });
  } catch (err) {
    console.error('Get registration error:', err);
    return c.json({ success: false, message: 'Could not fetch registration.' }, 500);
  }
});

// ─── DELETE /api/admin/registrations/:uniqueId ────────────────────────────────
admin.delete('/registrations/:uniqueId', requireAdmin, async (c) => {
  const uniqueId = c.req.param('uniqueId');

  try {
    const collection = await getCollection(c.env);

    const member = await collection.findOne({ uniqueId });

    if (!member) {
      return c.json({ success: false, message: 'Registration not found.' }, 404);
    }

    // Delete Cloudinary image
    if (member.photoPublicId) {
      try {
        await deleteFromCloudinary(member.photoPublicId, c.env);
      } catch (err) {
        console.error('Cloudinary delete warning (continuing):', err);
      }
    }

    // Delete from MongoDB
    await collection.deleteOne({ uniqueId });

    return c.json({ success: true, message: 'Registration deleted successfully.' });
  } catch (err) {
    console.error('Delete registration error:', err);
    return c.json({ success: false, message: 'Could not delete registration.' }, 500);
  }
});

// ─── POST /api/admin/registrations (Admin create new member) ─────────────────
admin.post('/registrations', requireAdmin, async (c) => {
  try {
    let formData;
    try {
      formData = await c.req.formData();
    } catch {
      return c.json({ success: false, message: 'Invalid form data. Please try again.' }, 400);
    }

    const fullName = (formData.get('fullName') || '').trim();
    const age = formData.get('age');
    const mobileNumber = (formData.get('mobileNumber') || '').trim();
    const dateOfBirth = (formData.get('dateOfBirth') || '').trim();
    const gender = (formData.get('gender') || '').trim();
    const email = (formData.get('email') || '').trim();
    const city = (formData.get('city') || '').trim();
    const position = (formData.get('position') || 'Member').trim();
    const photo = formData.get('photo');

    const validationErrors = validateRegistration(
      { fullName, age, mobileNumber, dateOfBirth, gender, email },
      photo
    );

    if (validationErrors) {
      return c.json({
        success: false,
        message: 'Validation failed. Please check your input.',
        errors: validationErrors,
      }, 422);
    }

    let collection;
    try {
      collection = await getCollection(c.env);
    } catch (err) {
      return c.json({ success: false, message: `Database error: ${err.message}` }, 503);
    }

    const prefix = c.env?.ID_PREFIX || 'MNR';
    let uniqueId;
    try {
      uniqueId = await generateUniqueId(collection, 10, prefix);
    } catch (err) {
      return c.json({ success: false, message: `Could not generate ID: ${err.message}` }, 500);
    }

    let photoUrl, photoPublicId;
    try {
      const uploadRes = await uploadToCloudinary(photo, c.env);
      photoUrl = uploadRes.secure_url;
      photoPublicId = uploadRes.public_id;
    } catch (err) {
      return c.json({ success: false, message: `Photo upload failed: ${err.message}` }, 500);
    }

    const now = new Date();
    const memberDoc = {
      uniqueId,
      fullName,
      position: position || 'Member',
      age: Number(age),
      mobileNumber,
      dateOfBirth,
      gender,
      email,
      city,
      photoUrl,
      photoPublicId,
      createdAt: now,
      updatedAt: now,
    };

    await collection.insertOne(memberDoc);

    return c.json({
      success: true,
      message: 'Member registered successfully!',
      data: {
        uniqueId,
        fullName,
        position: position || 'Member',
        age: Number(age),
        mobileNumber,
        dateOfBirth,
        gender,
        email,
        city,
        photoUrl,
        createdAt: now.toISOString(),
      },
    }, 201);
  } catch (err) {
    console.error('Admin create member error:', err);
    return c.json({ success: false, message: `Error registering member: ${err.message}` }, 500);
  }
});

// ─── PUT /api/admin/registrations/:uniqueId (Admin update member) ─────────────
admin.put('/registrations/:uniqueId', requireAdmin, async (c) => {
  const uniqueId = c.req.param('uniqueId');

  try {
    const collection = await getCollection(c.env);
    const existing = await collection.findOne({ uniqueId });

    if (!existing) {
      return c.json({ success: false, message: 'Member not found.' }, 404);
    }

    let formData;
    try {
      formData = await c.req.formData();
    } catch {
      return c.json({ success: false, message: 'Invalid form data.' }, 400);
    }

    const fullName = (formData.get('fullName') || existing.fullName || '').trim();
    const age = formData.get('age') !== null ? formData.get('age') : existing.age;
    const mobileNumber = (formData.get('mobileNumber') || existing.mobileNumber || '').trim();
    const dateOfBirth = (formData.get('dateOfBirth') || existing.dateOfBirth || '').trim();
    const gender = (formData.get('gender') || existing.gender || '').trim();
    const email = (formData.get('email') || existing.email || '').trim();
    const city = (formData.get('city') || existing.city || '').trim();
    const position = formData.get('position') !== null
      ? (formData.get('position') || '').trim()
      : (existing.position || 'Member');
    const photo = formData.get('photo'); // Optional on edit

    const errors = {};
    if (fullName) {
      const err = validateFullName(fullName);
      if (err) errors.fullName = err;
    }
    if (age) {
      const err = validateAge(age);
      if (err) errors.age = err;
    }
    if (mobileNumber) {
      const err = validateMobileNumber(mobileNumber);
      if (err) errors.mobileNumber = err;
    }
    if (dateOfBirth) {
      const err = validateDateOfBirth(dateOfBirth);
      if (err) errors.dateOfBirth = err;
    }
    if (gender) {
      const err = validateGender(gender);
      if (err) errors.gender = err;
    }
    if (email) {
      const err = validateEmail(email);
      if (err) errors.email = err;
    }

    if (photo && typeof photo !== 'string' && photo.size > 0) {
      const err = validateImageFile(photo);
      if (err) errors.photo = err;
    }

    if (Object.keys(errors).length > 0) {
      return c.json({
        success: false,
        message: 'Validation failed. Please check your input.',
        errors,
      }, 422);
    }

    let photoUrl = existing.photoUrl;
    let photoPublicId = existing.photoPublicId;

    if (photo && typeof photo !== 'string' && photo.size > 0) {
      try {
        const uploadRes = await uploadToCloudinary(photo, c.env);
        // Delete old photo if it exists
        if (existing.photoPublicId) {
          try {
            await deleteFromCloudinary(existing.photoPublicId, c.env);
          } catch (delErr) {
            console.warn('Could not delete old photo from Cloudinary:', delErr.message);
          }
        }
        photoUrl = uploadRes.secure_url;
        photoPublicId = uploadRes.public_id;
      } catch (uploadErr) {
        return c.json({ success: false, message: `Failed to upload new photo: ${uploadErr.message}` }, 500);
      }
    }

    const updateDoc = {
      fullName,
      position: position || 'Member',
      age: Number(age),
      mobileNumber,
      dateOfBirth,
      gender,
      email,
      city,
      photoUrl,
      photoPublicId,
      updatedAt: new Date(),
    };

    await collection.updateOne({ uniqueId }, { $set: updateDoc });

    const updated = await collection.findOne(
      { uniqueId },
      { projection: { _id: 0, photoPublicId: 0 } }
    );

    return c.json({
      success: true,
      message: 'Member details updated successfully!',
      data: updated,
    });
  } catch (err) {
    console.error('Admin update member error:', err);
    return c.json({ success: false, message: `Update failed: ${err.message}` }, 500);
  }
});

export default admin;
