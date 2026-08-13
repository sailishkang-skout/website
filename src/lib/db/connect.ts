import mongoose from "mongoose";
import dns from "dns";

// Set reliable DNS servers for MongoDB Atlas SRV resolution on Windows
try {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
  dns.setDefaultResultOrder("ipv4first");
} catch {
  // Ignore if not permitted
}

const MONGODB_URI = process.env.MONGODB_URI;

// Global cache to reuse connection across hot reloads in dev
const globalWithMongoose = global as typeof global & {
  mongoose?: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null };
};

if (!globalWithMongoose.mongoose) {
  globalWithMongoose.mongoose = { conn: null, promise: null };
}

const cached = globalWithMongoose.mongoose;

export async function connectDB() {
  if (process.env.NEXT_DISABLE_DB === "true") {
    return null;
  }

  if (!MONGODB_URI) {
    return null;
  }

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 8000,
    };
    cached.promise = mongoose.connect(MONGODB_URI, opts);
  }

  try {
    cached.conn = await cached.promise;
    console.log("[MongoDB] Connected successfully to Atlas.");
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}
