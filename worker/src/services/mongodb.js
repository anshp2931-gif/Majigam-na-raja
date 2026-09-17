// worker/src/services/mongodb.js
// Connects Cloudflare Worker to MongoDB Atlas via secure HTTPS bridge

const DEFAULT_BRIDGE_URL = 'https://majigam-na-raja.vercel.app/api/db';
const DEFAULT_INTERNAL_SECRET = 'mnr_secret_session_key_2026_majigam_na_raja';

async function callMongoBridge(collection, action, args = {}, env = {}) {
  const bridgeUrl = env.MONGODB_BRIDGE_URL || DEFAULT_BRIDGE_URL;
  const secret = env.INTERNAL_SECRET || DEFAULT_INTERNAL_SECRET;

  const res = await fetch(bridgeUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-internal-secret': secret,
    },
    body: JSON.stringify({ collection, action, args }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`MongoDB Bridge Error (${res.status}): ${errText}`);
  }

  const data = await res.json();
  if (!data.success) {
    throw new Error(data.error || 'MongoDB operation failed');
  }

  return data.result;
}

class MongoBridgeCursor {
  constructor(collection, filter = {}, options = {}, env = {}) {
    this.collection = collection;
    this.filter = filter;
    this.options = { ...options };
    this.env = env;
  }

  sort(sort) { this.options.sort = sort; return this; }
  skip(skip) { this.options.skip = skip; return this; }
  limit(limit) { this.options.limit = limit; return this; }
  project(projection) { this.options.projection = projection; return this; }

  async toArray() {
    return await callMongoBridge(this.collection, 'find', {
      filter: this.filter,
      options: this.options,
    }, this.env);
  }
}

class MongoBridgeAggregateCursor {
  constructor(collection, pipeline = [], env = {}) {
    this.collection = collection;
    this.pipeline = pipeline;
    this.env = env;
  }

  async toArray() {
    return await callMongoBridge(this.collection, 'aggregate', {
      pipeline: this.pipeline,
    }, this.env);
  }
}

class MongoAtlasCollection {
  constructor(collectionName, env = {}) {
    this.collectionName = collectionName;
    this.env = env;
  }

  find(filter = {}, options = {}) {
    return new MongoBridgeCursor(this.collectionName, filter, options, this.env);
  }

  async findOne(filter = {}, options = {}) {
    return await callMongoBridge(this.collectionName, 'findOne', { filter, options }, this.env);
  }

  async insertOne(doc) {
    return await callMongoBridge(this.collectionName, 'insertOne', { doc }, this.env);
  }

  async updateOne(filter, update, options = {}) {
    return await callMongoBridge(this.collectionName, 'updateOne', { filter, update, options }, this.env);
  }

  async deleteOne(filter) {
    return await callMongoBridge(this.collectionName, 'deleteOne', { filter }, this.env);
  }

  async deleteMany(filter) {
    return await callMongoBridge(this.collectionName, 'deleteMany', { filter }, this.env);
  }

  async countDocuments(filter = {}) {
    return await callMongoBridge(this.collectionName, 'countDocuments', { filter }, this.env);
  }

  async distinct(field, filter = {}) {
    return await callMongoBridge(this.collectionName, 'distinct', { field, filter }, this.env);
  }

  aggregate(pipeline = []) {
    return new MongoBridgeAggregateCursor(this.collectionName, pipeline, this.env);
  }

  async createIndex() {
    return true;
  }
}

export async function getCollection(env, collectionName = 'registrations') {
  return new MongoAtlasCollection(collectionName, env);
}

export async function ensureIndexes(env) {
  return true;
}
