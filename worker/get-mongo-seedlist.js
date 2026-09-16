import dns from 'dns/promises';

async function getDirectUri(srvHost) {
  const host = srvHost || process.env.MONGODB_SRV_HOST;
  if (!host) {
    console.log("Usage: node get-mongo-seedlist.js <cluster-hostname>");
    console.log("Example: node get-mongo-seedlist.js cluster0.xxxxxx.mongodb.net");
    return;
  }
  try {
    const srvs = await dns.resolveSrv(`_mongodb._tcp.${host}`);
    console.log("SRV Records:", srvs);
    const hosts = srvs.map(s => `${s.name}:${s.port}`).join(',');
    console.log("\nSEEDLIST HOSTS:\n", hosts);
  } catch (err) {
    console.error("DNS Error:", err);
  }
}

const arg = process.argv[2];
getDirectUri(arg);
