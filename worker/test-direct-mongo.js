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

const directUri = process.env.MONGODB_DIRECT_URI || process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DATABASE || 'majigam_na_raja';

if (!directUri) {
  console.error("❌ MONGODB_URI is not set in worker/.env");
  process.exit(1);
}

async function testDirect() {
  console.log("Testing MongoDB Connection...");
  const client = new MongoClient(directUri);
  try {
    await client.connect();
    console.log("✓ Connected successfully!");
    const db = client.db(dbName);
    const count = await db.collection("registrations").countDocuments({});
    console.log("✓ Registration count:", count);
  } catch (err) {
    console.error("Connection failed:", err);
  } finally {
    await client.close();
  }
}

testDirect();
