import mongoose from 'mongoose';

  
//extract the mmongodb_uri from env

const MONGODB_URI=process.env.MONGO_URI;
if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable in .env.local');
  }
  
  const uri: string = MONGODB_URI; // TypeScript now knows it's a string
  declare global {
    // This makes TypeScript aware of the global `mongoose` object
    const mongoose: {
      conn: typeof mongoose | null;
      promise: Promise<typeof mongoose> | null;
    } | undefined;
  }

// Prevent error "Cannot redeclare block-scoped variable"
export {};

const globalWithMongoose = globalThis as typeof globalThis & {
  mongoose: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
};
  //Maintain a cached connection across hot reloads in development
  if (!globalWithMongoose.mongoose) {
    globalWithMongoose.mongoose = { conn: null, promise: null };
  }
  

async function dbConnect(): Promise<typeof mongoose> {
  if (globalWithMongoose.mongoose?.conn) return globalWithMongoose.mongoose.conn;

  if (!globalWithMongoose.mongoose?.promise) {
    globalWithMongoose.mongoose.promise = mongoose.connect(uri).then((mongoose) => mongoose);
  }

  globalWithMongoose.mongoose.conn = await globalWithMongoose.mongoose.promise;
  return globalWithMongoose.mongoose.conn;
   
}
  export default dbConnect;