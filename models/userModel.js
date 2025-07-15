const connectDB = require('../db');

class UserModel {
  static async getByEmail({ emailUser }) {
    const db = await connectDB();
    const users = await db.collection('usuarios');
    const user = await users.findOne({ correo: emailUser });
    return user;
  }

  static async createStudent({ emailUser }) {
    const db = await connectDB();
    const users = await db.collection('usuarios');
    const newUser = {
      correo: emailUser,
      rol: 'estudiante'  // al realizar login solo se crean estudiantes
    };
    const result = users.insertOne(newUser);
    console.log(`Estudiante insertado con la _id: ${result.insertedId}`);
  }
}

module.exports = UserModel;