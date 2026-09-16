import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.join(__dirname, '.env');

if (fs.existsSync(envPath) && typeof process.loadEnvFile === 'function') {
  process.loadEnvFile(envPath);
}

const username = process.env.ADMIN_USERNAME || "admin";
const password = process.env.TEST_ADMIN_PASSWORD || "admin123";

async function testLogin() {
  console.log(`Testing Admin Login with username: "${username}"...`);
  const res = await fetch("http://localhost:8787/api/admin/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username,
      password
    })
  });

  const json = await res.json();
  console.log("Status:", res.status);
  console.log("Response:", json);
  console.log("Cookie header:", res.headers.get("set-cookie"));
}

testLogin().catch(console.error);
