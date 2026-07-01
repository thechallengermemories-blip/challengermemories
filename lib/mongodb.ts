// lib/mongodb.ts
//
// Cached Mongoose connection, safe for Next.js dev hot-reload and
// serverless route handlers (reuses the connection across invocations
// instead of opening a new one on every request).

import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

// eslint-disable-next-line no-var
declare global {
  var _mongooseCache: MongooseCache | undefined;
}

const cache: MongooseCache = global._mongooseCache ?? { conn: null, promise: null };
global._mongooseCache = cache;

export async function connectDB() {
  if (!MONGODB_URI) throw new Error("Missing MONGODB_URI in environment");

  if (cache.conn) return cache.conn;

  if (!cache.promise) {
    cache.promise = mongoose.connect(MONGODB_URI);
  }

  cache.conn = await cache.promise;
  return cache.conn;
}