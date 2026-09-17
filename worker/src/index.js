// worker/src/index.js
// Cloudflare Worker entry point — Hono.js application.

import { Hono } from 'hono';
import { cors } from 'hono/cors';
import registration from './routes/registration.js';
import publicRoutes from './routes/public.js';
import members from './routes/members.js';
import admin from './routes/admin.js';
import gallery from './routes/gallery.js';
import funds from './routes/funds.js';
import { ensureIndexes } from './services/mongodb.js';

const app = new Hono();

// ─── CORS ─────────────────────────────────────────────────────────────────────
app.use(
  '*',
  cors({
    origin: (origin) => origin || '*',
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    exposeHeaders: ['Content-Length', 'Set-Cookie'],
    credentials: true,
    maxAge: 86400,
  })
);

app.use('*', async (c, next) => {
  c.env = {
    ...(typeof process !== 'undefined' ? process.env : {}),
    ...c.env,
  };
  await next();
});

// ─── Health check ─────────────────────────────────────────────────────────────
app.get('/', (c) => {
  return c.json({
    success: true,
    message: 'MAJIGAM NA RAJA API — Running',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

app.get('/api/health', (c) => {
  return c.json({ success: true, status: 'ok', timestamp: new Date().toISOString() });
});

// ─── Setup indexes (idempotent) ───────────────────────────────────────────────
app.get('/api/setup', async (c) => {
  try {
    await ensureIndexes(c.env);
    return c.json({ success: true, message: 'Database indexes ensured.' });
  } catch (err) {
    return c.json({ success: false, message: err.message }, 500);
  }
});

// ─── Routes ───────────────────────────────────────────────────────────────────
app.route('/api/register', registration);
app.route('/api/id', publicRoutes);
app.route('/api/members', members);
app.route('/api/admin', admin);
app.route('/api/gallery', gallery);
app.route('/api/admin/gallery', gallery);
app.route('/api/funds', funds);

// ─── 404 catch-all ────────────────────────────────────────────────────────────
app.notFound((c) => {
  return c.json({ success: false, message: 'Route not found.' }, 404);
});

// ─── Global error handler ─────────────────────────────────────────────────────
app.onError((err, c) => {
  console.error('Unhandled error:', err);
  return c.json({ success: false, message: 'Internal server error.' }, 500);
});

export default app;
