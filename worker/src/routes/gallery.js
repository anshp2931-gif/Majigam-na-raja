// worker/src/routes/gallery.js
// Public: GET /api/gallery
//         GET /api/gallery/years
// Admin:  POST /api/admin/gallery/upload
//         DELETE /api/admin/gallery/:id

import { Hono } from 'hono';
import { requireAdmin } from '../middleware/auth.js';
import { uploadToCloudinaryGallery, deleteFromCloudinary } from '../services/cloudinary.js';
import { getCollection } from '../services/mongodb.js';

const gallery = new Hono();

// ─── Helpers ──────────────────────────────────────────────────────────────────

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
const ALLOWED_VIDEO_TYPES = [
  'video/mp4',
  'video/webm',
  'video/quicktime',
  'video/x-matroska',
  'video/ogg',
];

const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10 MB
const MAX_VIDEO_SIZE = 50 * 1024 * 1024; // 50 MB

// ─── GET /api/gallery/years  (public) ─────────────────────────────────────────
gallery.get('/years', async (c) => {
  try {
    const col = await getCollection(c.env, 'gallery_images');
    const distinctYears = await col.distinct('year', { year: { $ne: null } });
    const years = (distinctYears || [])
      .filter((y) => y !== null && y !== undefined && !isNaN(Number(y)))
      .map((y) => Number(y))
      .sort((a, b) => b - a);

    return c.json({ success: true, years });
  } catch (err) {
    console.error('Gallery years fetch error:', err);
    return c.json({ success: false, message: `Failed to load years: ${err.message}` }, 500);
  }
});

// ─── GET /api/gallery  (public) ───────────────────────────────────────────────
gallery.get('/', async (c) => {
  const page = Math.max(1, parseInt(c.req.query('page') || '1'));
  const limit = Math.min(50, Math.max(1, parseInt(c.req.query('limit') || '20')));
  const typeFilter = c.req.query('type'); // 'image' | 'video' | undefined
  const yearFilter = c.req.query('year'); // e.g. '2024'
  const offset = (page - 1) * limit;

  try {
    const col = await getCollection(c.env, 'gallery_images');
    const filter = {};

    if (typeFilter && ['image', 'video'].includes(typeFilter)) {
      filter.mediaType = typeFilter;
    }

    const yearNum = yearFilter ? parseInt(yearFilter) : NaN;
    if (!isNaN(yearNum) && yearNum > 1900 && yearNum < 3000) {
      filter.year = yearNum;
    }

    const [rows, total] = await Promise.all([
      col
        .find(filter)
        .sort({ createdAt: -1 })
        .skip(offset)
        .limit(limit)
        .toArray(),
      col.countDocuments(filter),
    ]);

    const hasMore = offset + limit < total;

    return c.json({
      success: true,
      data: (rows || []).map((r) => {
        const isVideo = r.mediaType === 'video' || (r.imageUrl && r.imageUrl.includes('/video/'));
        return {
          id: r._id?.toString() || r.id,
          title: r.title || null,
          imageUrl: r.imageUrl,
          publicId: r.publicId,
          originalFilename: r.originalFilename,
          fileSize: r.fileSize,
          mediaType: isVideo ? 'video' : 'image',
          year: r.year || null,
          createdAt: r.createdAt,
        };
      }),
      page,
      limit,
      total,
      hasMore,
    });
  } catch (err) {
    console.error('Gallery fetch error:', err);
    return c.json({ success: false, message: `Failed to load gallery: ${err.message}` }, 500);
  }
});

// ─── POST /api/admin/gallery/upload  (admin only) ─────────────────────────────
gallery.post('/upload', requireAdmin, async (c) => {
  let formData;
  try {
    formData = await c.req.formData();
  } catch {
    return c.json({ success: false, message: 'Invalid form data.' }, 400);
  }

  const file = formData.get('file') || formData.get('image') || formData.get('media');
  const title = (formData.get('title') || '').trim() || null;
  const yearRaw = formData.get('year');
  const year = yearRaw ? parseInt(yearRaw) : new Date().getFullYear();
  const yearValue = (!isNaN(year) && year > 1900 && year < 3000) ? year : new Date().getFullYear();

  // Validate file presence
  if (!file || typeof file === 'string') {
    return c.json({ success: false, message: 'No image or video file provided.' }, 400);
  }

  // Validate type & size
  const mimeType = file.type?.toLowerCase() || '';
  const isImage = ALLOWED_IMAGE_TYPES.includes(mimeType);
  const isVideo = ALLOWED_VIDEO_TYPES.includes(mimeType) || mimeType.startsWith('video/');

  if (!isImage && !isVideo) {
    return c.json({
      success: false,
      message: 'Invalid file format. Allowed: JPG, PNG, WEBP for photos; MP4, WEBM, MOV for videos.',
    }, 422);
  }

  const maxSize = isVideo ? MAX_VIDEO_SIZE : MAX_IMAGE_SIZE;
  const arrayBuffer = await file.arrayBuffer();

  if (arrayBuffer.byteLength > maxSize) {
    const limitMB = isVideo ? 50 : 10;
    return c.json({
      success: false,
      message: `File too large. Maximum size is ${limitMB} MB. Your file is ${(arrayBuffer.byteLength / 1024 / 1024).toFixed(1)} MB.`,
    }, 422);
  }

  const mediaType = isVideo ? 'video' : 'image';
  const fileBlob = new File([arrayBuffer], file.name || (isVideo ? 'video.mp4' : 'image.jpg'), { type: mimeType });

  // Upload to Cloudinary
  let cloudResult;
  try {
    cloudResult = await uploadToCloudinaryGallery(fileBlob, c.env, isVideo);
  } catch (err) {
    console.error('Cloudinary upload error:', err);
    return c.json({ success: false, message: `Upload failed: ${err.message}` }, 500);
  }

  // Save to MongoDB Atlas
  try {
    const col = await getCollection(c.env, 'gallery_images');
    const doc = {
      title,
      imageUrl: cloudResult.secure_url,
      publicId: cloudResult.public_id,
      assetId: cloudResult.asset_id || null,
      originalFilename: file.name || null,
      fileSize: arrayBuffer.byteLength,
      mediaType,
      year: yearValue,
      createdAt: new Date(),
    };

    const insertResult = await col.insertOne(doc);
    const id = insertResult?.insertedId || doc._id || crypto.randomUUID();

    return c.json({
      success: true,
      message: `${isVideo ? 'Video' : 'Photo'} uploaded successfully.`,
      data: {
        id: id.toString(),
        ...doc,
      },
    }, 201);
  } catch (err) {
    // Clean up Cloudinary on DB failure
    try { await deleteFromCloudinary(cloudResult.public_id, c.env, mediaType); } catch {}
    console.error('MongoDB gallery insert error:', err);
    return c.json({ success: false, message: `Failed to save record: ${err.message}` }, 500);
  }
});

// ─── DELETE /api/admin/gallery/:id  (admin only) ──────────────────────────────
gallery.delete('/:id', requireAdmin, async (c) => {
  const id = c.req.param('id');
  if (!id) {
    return c.json({ success: false, message: 'Invalid media ID.' }, 400);
  }

  try {
    const col = await getCollection(c.env, 'gallery_images');

    // Fetch record first (need publicId and mediaType for Cloudinary deletion)
    const row = await col.findOne({
      $or: [
        { _id: id },
        { id: id },
      ],
    });

    if (!row) {
      return c.json({ success: false, message: 'Item not found.' }, 404);
    }

    const isVideo = row.mediaType === 'video' || (row.imageUrl && row.imageUrl.includes('/video/'));

    // Delete from Cloudinary
    if (row.publicId) {
      try {
        await deleteFromCloudinary(row.publicId, c.env, isVideo ? 'video' : 'image');
      } catch (err) {
        console.warn('Cloudinary delete failed (proceeding with DB deletion):', err.message);
      }
    }

    // Delete from MongoDB Atlas
    await col.deleteOne({
      $or: [
        { _id: row._id || id },
        { id: row.id || id },
      ],
    });

    return c.json({ success: true, message: 'Item deleted successfully.' });
  } catch (err) {
    console.error('Gallery delete error:', err);
    return c.json({ success: false, message: `Failed to delete item: ${err.message}` }, 500);
  }
});

export default gallery;
