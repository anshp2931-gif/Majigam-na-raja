// worker/src/routes/members.js
// GET /api/members — Public member directory endpoint (read-only for normal users)

import { Hono } from 'hono';
import { getCollection } from '../services/mongodb.js';

const members = new Hono();

// GET /api/members — List all public members
members.get('/', async (c) => {
  try {
    const collection = await getCollection(c.env);

    const search = (c.req.query('search') || '').trim();
    const gender = (c.req.query('gender') || '').trim();
    const city = (c.req.query('city') || '').trim();

    const filter = {};

    if (search) {
      filter.$or = [
        { uniqueId: { $regex: search, $options: 'i' } },
        { fullName: { $regex: search, $options: 'i' } },
        { city: { $regex: search, $options: 'i' } },
      ];
    }

    if (gender && ['Male', 'Female', 'Other'].includes(gender)) {
      filter.gender = gender;
    }

    if (city) {
      filter.city = { $regex: `^${city}$`, $options: 'i' };
    }

    const records = await collection
      .find(filter, {
        projection: {
          _id: 0,
          uniqueId: 1,
          fullName: 1,
          position: 1,
          age: 1,
          dateOfBirth: 1,
          gender: 1,
          city: 1,
          photoUrl: 1,
          createdAt: 1,
        },
      })
      .sort({ createdAt: -1 })
      .limit(500)
      .toArray();

    const total = await collection.countDocuments(filter);

    return c.json({
      success: true,
      data: records,
      total,
    });
  } catch (err) {
    console.error('Public members directory error:', err);
    return c.json({
      success: false,
      message: 'Could not fetch member directory. Please try again.',
      data: [],
      total: 0,
    }, 500);
  }
});

export default members;
