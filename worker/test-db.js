import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { MongoClient } from 'mongodb';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.join(__dirname, '.env');

if (fs.existsSync(envPath) && typeof process.loadEnvFile === 'function') {
  process.loadEnvFile(envPath);
}

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DATABASE || 'majigam_na_raja';

if (!uri) {
  console.error("❌ MONGODB_URI is not set in worker/.env");
  process.exit(1);
}

async function test() {
  console.log("Connecting to MongoDB Atlas...");
  const client = new MongoClient(uri);
  try {
    await client.connect();
    console.log("✓ Connected successfully to MongoDB Atlas!");
    const db = client.db(dbName);
    const collections = await db.listCollections().toArray();
    console.log("Database:", dbName);
    console.log("Collections:", collections.map(c => c.name));
  } catch (err) {
    console.error("MongoDB Connection Error:", err);
  } finally {
    await client.close();
  }
}

test();
