import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI;
const options = {};

// Ensure URI is defined
if (!uri) {
  throw new Error("Please define the MONGO_URI environment variable in .env.local");
}

// Extend the global type for hot reload handling
declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
