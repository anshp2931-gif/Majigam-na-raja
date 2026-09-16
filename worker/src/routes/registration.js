// worker/src/routes/registration.js
// POST /api/register — Public registration endpoint (closed to normal users)

import { Hono } from 'hono';

const registration = new Hono();

registration.post('/', async (c) => {
  return c.json({
    success: false,
    message: 'Public registration is closed. Only administrators can register new members.',
  }, 403);
});

export default registration;
