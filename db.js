const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://csanchezor:Atl45d4b35t0n3.@simulador-unal-cluster.dryv4pr.mongodb.net/?retryWrites=true&w=majority&appName=simulador-unal-cluster";

const client = new MongoClient(uri)

async function connect() {
  try {
    const database = client.db('data')
    return database.collection('usuarios')
  } catch (error) {
    console.error('Error connecting to the database')
    console.error(error)
    await client.close()
  }
}

class Usuarios {
  static async getByEmail({ emailUser }) {
    const db = await connect();
    return db.findOne({ correo: emailUser });
  }
}

Usuarios.getByEmail({ emailUser: 'csanchezor' });

module.exports = Usuarios;