const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://csanchezor:Atl45d4b35t0n3.@simulador-unal-cluster.dryv4pr.mongodb.net/?retryWrites=true&w=majority&appName=simulador-unal-cluster";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let db;

async function connectDB() {
  try {
    if (!db) db = client.db('data');
    return db;
  } catch (error) {
    console.error('Error connecting to the database.')
    console.error(error)
    await client.close()
  }
  return db;
}

module.exports = connectDB;