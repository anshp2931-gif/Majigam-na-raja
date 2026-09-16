// worker/dev-server.js
// Runs the Hono backend API directly on Node.js using @hono/node-server
// Includes local D1 mock store for seamless local testing without Miniflare.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import app from './src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Auto-load .env or .dev.vars for local development
const candidateEnvFiles = [
  path.join(__dirname, '.env'),
  path.join(__dirname, '.dev.vars'),
  path.join(__dirname, '..', '.env'),
];

for (const envFile of candidateEnvFiles) {
  if (fs.existsSync(envFile)) {
    try {
      if (typeof process.loadEnvFile === 'function') {
        process.loadEnvFile(envFile);
      } else {
        // Fallback parser if loadEnvFile is not present
        const content = fs.readFileSync(envFile, 'utf8');
        content.split(/\r?\n/).forEach((line) => {
          const trimmed = line.trim();
          if (trimmed && !trimmed.startsWith('#')) {
            const eqIdx = trimmed.indexOf('=');
            if (eqIdx > 0) {
              const key = trimmed.slice(0, eqIdx).trim();
              const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, '');
              if (!process.env[key]) {
                process.env[key] = val;
              }
            }
          }
        });
      }
      console.log(`Loaded environment from: ${envFile}`);
      break;
    } catch (err) {
      console.warn(`Could not load ${envFile}:`, err.message);
    }
  }
}

// In-memory / mock D1 store for local development
const mockGalleryStore = [];
let nextId = 1;

const mockD1 = {
  isMock: true,
  prepare(sql) {
    let boundParams = [];
    return {
      bind(...params) {
        boundParams = params;
        return this;
      },
      async all() {
        if (sql.includes('SELECT id, title')) {
          const limit = boundParams[0] || 20;
          const offset = boundParams[1] || 0;
          const sorted = [...mockGalleryStore].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
          const sliced = sorted.slice(offset, offset + limit);
          return { results: sliced };
        }
        return { results: [] };
      },
      async first() {
        if (sql.includes('COUNT(*)')) {
          return { total: mockGalleryStore.length };
        }
        if (sql.includes('SELECT id, public_id')) {
          const id = boundParams[0];
          return mockGalleryStore.find((item) => item.id === id) || null;
        }
        return null;
      },
      async run() {
        if (sql.includes('INSERT INTO gallery_images')) {
          const [title, image_url, public_id, asset_id, original_filename, file_size, media_type] = boundParams;
          const record = {
            id: nextId++,
            title,
            image_url,
            public_id,
            asset_id,
            original_filename,
            file_size,
            media_type: media_type || 'image',
            created_at: new Date().toISOString(),
          };
          mockGalleryStore.push(record);
          return { meta: { last_row_id: record.id } };
        }
        if (sql.includes('DELETE FROM gallery_images')) {
          const id = boundParams[0];
          const idx = mockGalleryStore.findIndex((item) => item.id === id);
          if (idx !== -1) mockGalleryStore.splice(idx, 1);
          return { success: true };
        }
        return { success: true };
      },
    };
  },
};

// Environment variables
const env = {
  MONGODB_URI: process.env.MONGODB_URI || "",
  MONGODB_DATABASE: process.env.MONGODB_DATABASE || "majigam_na_raja",
  MONGODB_COLLECTION: process.env.MONGODB_COLLECTION || "registrations",
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || "",
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || "",
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET || "",
  ADMIN_USERNAME: process.env.ADMIN_USERNAME || "admin",
  ADMIN_PASSWORD_HASH: process.env.ADMIN_PASSWORD_HASH || "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918",
  SESSION_SECRET: process.env.SESSION_SECRET || "mnr_secret_session_key_2026_majigam_na_raja",
  PUBLIC_BASE_URL: process.env.PUBLIC_BASE_URL || "http://localhost:5173",
  ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS || "http://localhost:5173,http://localhost:4173",
  ID_PREFIX: process.env.ID_PREFIX || "MNR",
  DB: mockD1,
};

const wrapper = new Hono();

// Middleware to inject env into Hono context for Node environment
wrapper.use('*', async (c, next) => {
  c.env = { ...env, ...process.env, ...c.env };
  if (!c.env.DB) c.env.DB = mockD1;
  await next();
});

wrapper.route('/', app);

const port = Number(process.env.PORT) || 8787;
console.log(`🚀 MAJIGAM NA RAJA API Server running at http://localhost:${port}`);

serve({
  fetch: wrapper.fetch,
  port,
});
