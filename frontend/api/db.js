import { MongoClient, ObjectId } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://ansh:ansh01234@cluster0.2rwa1ew.mongodb.net/?appName=Cluster0";
const MONGODB_DATABASE = process.env.MONGODB_DATABASE || "majigam_na_raja";
const INTERNAL_SECRET = process.env.INTERNAL_SECRET || "mnr_secret_session_key_2026_majigam_na_raja";

const ISO_DATE_REGEX = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z?$/;

function reviveMongoQuery(obj) {
  if (!obj || typeof obj !== 'object') return obj;
  if (Array.isArray(obj)) return obj.map(reviveMongoQuery);
  const result = {};
  for (const [k, v] of Object.entries(obj)) {
    if (k === '_id') {
      if (typeof v === 'string' && ObjectId.isValid(v)) {
        result[k] = { $in: [v, new ObjectId(v)] };
      } else if (v && typeof v === 'object') {
        result[k] = reviveMongoQuery(v);
      } else {
        result[k] = v;
      }
    } else if (typeof v === 'string' && ISO_DATE_REGEX.test(v)) {
      result[k] = new Date(v);
    } else if (typeof v === 'object' && v !== null) {
      result[k] = reviveMongoQuery(v);
    } else {
      result[k] = v;
    }
  }
  return result;
}

function reviveDoc(obj) {
  if (!obj || typeof obj !== 'object') return obj;
  if (Array.isArray(obj)) return obj.map(reviveDoc);
  const result = {};
  for (const [k, v] of Object.entries(obj)) {
    if (typeof v === 'string' && ISO_DATE_REGEX.test(v)) {
      result[k] = new Date(v);
    } else if (typeof v === 'object' && v !== null) {
      result[k] = reviveDoc(v);
    } else {
      result[k] = v;
    }
  }
  return result;
}

let cachedClient = null;

async function getClient() {
  if (!cachedClient) {
    cachedClient = new MongoClient(MONGODB_URI, {
      maxPoolSize: 10,
    });
    await cachedClient.connect();
  }
  return cachedClient;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const secret = req.headers['x-internal-secret'];
  if (secret !== INTERNAL_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { collection, action, args = {} } = req.body || {};
  if (!collection || !action) {
    return res.status(400).json({ error: 'Missing collection or action' });
  }

  try {
    const client = await getClient();
    const db = client.db(MONGODB_DATABASE);
    const col = db.collection(collection);

    let result;
    switch (action) {
      case 'find': {
        const { filter = {}, options = {} } = args;
        const parsedFilter = reviveMongoQuery(filter);
        let cursor = col.find(parsedFilter);
        if (options.projection) cursor = cursor.project(options.projection);
        if (options.sort) cursor = cursor.sort(options.sort);
        if (options.skip) cursor = cursor.skip(options.skip);
        if (options.limit) cursor = cursor.limit(options.limit);
        result = await cursor.toArray();
        break;
      }
      case 'findOne': {
        const { filter = {}, options = {} } = args;
        const parsedFilter = reviveMongoQuery(filter);
        result = await col.findOne(parsedFilter, options);
        break;
      }
      case 'insertOne': {
        const { doc } = args;
        result = await col.insertOne(reviveDoc(doc));
        break;
      }
      case 'updateOne': {
        const { filter = {}, update = {}, options = {} } = args;
        const parsedFilter = reviveMongoQuery(filter);
        const parsedUpdate = reviveDoc(update);
        result = await col.updateOne(parsedFilter, parsedUpdate, options);
        break;
      }
      case 'deleteOne': {
        const { filter = {} } = args;
        const parsedFilter = reviveMongoQuery(filter);
        result = await col.deleteOne(parsedFilter);
        break;
      }
      case 'deleteMany': {
        const { filter = {} } = args;
        const parsedFilter = reviveMongoQuery(filter);
        result = await col.deleteMany(parsedFilter);
        break;
      }
      case 'countDocuments': {
        const { filter = {} } = args;
        const parsedFilter = reviveMongoQuery(filter);
        result = await col.countDocuments(parsedFilter);
        break;
      }
      case 'distinct': {
        const { field, filter = {} } = args;
        const parsedFilter = reviveMongoQuery(filter);
        result = await col.distinct(field, parsedFilter);
        break;
      }
      case 'aggregate': {
        const { pipeline = [] } = args;
        result = await col.aggregate(pipeline).toArray();
        break;
      }
      default:
        return res.status(400).json({ error: `Unsupported action: ${action}` });
    }

    return res.status(200).json({ success: true, result });
  } catch (err) {
    console.error(`[MongoBridge Error] ${action} on ${collection}:`, err);
    return res.status(500).json({ success: false, error: err.message });
  }
}
