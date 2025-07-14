const { MongoClient } = require("mongodb");

// Replace the uri string with your connection string
const uri = "mongodb+srv://csanchezor:Atl45d4b35t0n3.@simulador-unal-cluster.dryv4pr.mongodb.net/?retryWrites=true&w=majority&appName=simulador-unal-cluster";

const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db('data');
    const movies = database.collection('administradores');

    // Queries for a movie that has a title value of 'Back to the Future'
    const query = {};
    const movie = await movies.findOne(query);

    console.log(movie);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);