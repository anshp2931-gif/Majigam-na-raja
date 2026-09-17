import { execSync } from 'node:child_process';
import { MongoClient } from 'mongodb';

const MONGODB_URI = "mongodb+srv://ansh:ansh01234@cluster0.2rwa1ew.mongodb.net/?appName=Cluster0";
const MONGODB_DB = "majigam_na_raja";

async function run() {
  console.log('Fetching all registrations from Cloudflare D1...');
  const d1Raw = execSync(
    'npx wrangler d1 execute majigam-na-raja-db --remote --json --command "SELECT * FROM registrations"',
    { encoding: 'utf8', cwd: process.cwd() }
  );

  const parsed = JSON.parse(d1Raw);
  const rows = parsed[0]?.results || [];
  console.log(`Found ${rows.length} member(s) in Cloudflare D1.`);

  console.log('Connecting to MongoDB Atlas...');
  const client = new MongoClient(MONGODB_URI);
  await client.connect();

  const db = client.db(MONGODB_DB);
  const col = db.collection('registrations');

  const d1UniqueIds = rows.map((r) => r.uniqueId);

  // Delete any members in MongoDB that are no longer in D1
  const deleteResult = await col.deleteMany({
    uniqueId: { $nin: d1UniqueIds }
  });
  if (deleteResult.deletedCount > 0) {
    console.log(`Deleted ${deleteResult.deletedCount} removed member(s) from MongoDB Atlas.`);
  }

  let synced = 0;
  for (const row of rows) {
    const doc = {
      uniqueId: row.uniqueId,
      fullName: row.fullName,
      age: row.age,
      mobileNumber: row.mobileNumber,
      dateOfBirth: row.dateOfBirth,
      gender: row.gender,
      email: row.email,
      city: row.city || '',
      position: row.position || 'Member',
      photoUrl: row.photoUrl || '',
      photoPublicId: row.photoPublicId || '',
      createdAt: row.createdAt ? new Date(row.createdAt) : new Date(),
      updatedAt: row.updatedAt ? new Date(row.updatedAt) : new Date(),
    };

    await col.updateOne(
      { uniqueId: row.uniqueId },
      { $set: doc },
      { upsert: true }
    );
    console.log(`Synced: ${row.fullName} (${row.uniqueId})`);
    synced++;
  }

  await client.close();
  console.log(`MongoDB Atlas is now an exact mirror of Cloudflare D1 (${synced} active members).`);
}

run().catch((err) => {
  console.error('Sync failed:', err);
  process.exit(1);
});
