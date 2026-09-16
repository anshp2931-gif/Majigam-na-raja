import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getCollection } from './src/services/mongodb.js';
import { uploadToCloudinary } from './src/services/cloudinary.js';
import { generateUniqueId } from './src/services/idGenerator.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.join(__dirname, '.env');

if (fs.existsSync(envPath) && typeof process.loadEnvFile === 'function') {
  process.loadEnvFile(envPath);
}

const mockEnv = {
  MONGODB_URI: process.env.MONGODB_URI,
  MONGODB_DATABASE: process.env.MONGODB_DATABASE || "majigam_na_raja",
  MONGODB_COLLECTION: process.env.MONGODB_COLLECTION || "registrations",
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  ID_PREFIX: process.env.ID_PREFIX || "MNR",
};

async function testRegistration() {
  console.log("1. Connecting to MongoDB...");
  const collection = await getCollection(mockEnv);
  console.log("✓ Connected to MongoDB");

  console.log("2. Generating unique ID...");
  const uniqueId = await generateUniqueId(collection, 10, mockEnv.ID_PREFIX);
  console.log("✓ Unique ID generated:", uniqueId);

  console.log("3. Testing Cloudinary upload with dummy 1x1 PNG...");
  const pngBuffer = Buffer.from(
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
    'base64'
  );
  const file = new File([pngBuffer], 'test.png', { type: 'image/png' });

  const cloudinaryRes = await uploadToCloudinary(file, mockEnv);
  console.log("✓ Cloudinary Upload Successful:", cloudinaryRes.secure_url);

  console.log("4. Inserting test record into MongoDB...");
  const doc = {
    uniqueId,
    fullName: "Test Member",
    age: 25,
    mobileNumber: "9876543210",
    bloodGroup: "B+",
    city: "Majigam",
    photoUrl: cloudinaryRes.secure_url,
    photoPublicId: cloudinaryRes.public_id,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  await collection.insertOne(doc);
  console.log("✓ Test document inserted successfully into MongoDB!");

  console.log("5. Verifying retrieval...");
  const retrieved = await collection.findOne({ uniqueId });
  console.log("✓ Retrieved from MongoDB:", retrieved.uniqueId, retrieved.fullName);

  console.log("\n🎉 FULL BACKEND PIPELINE (MONGODB + CLOUDINARY + UNIQUE ID) IS WORKING 100%!");
}

testRegistration().catch((err) => {
  console.error("❌ Registration Test Failed:", err);
});
