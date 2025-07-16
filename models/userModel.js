const { writeJSON } = require('../utils');
const users = require('../data/usuarios.json');
const usersPath = './data/usuarios.json';

class UserModel {
  static getByEmail(emailUser) {
    return users.find(user => user.correo === emailUser);
  }

  static createStudent(emailUser) {
    const newUser = {
      correo: emailUser,
      rol: 'estudiante'  // al realizar login solo se crean estudiantes
    };
    users.push(newUser);
    writeJSON(usersPath, users);
    console.log(`Estudiante "${emailUser}" creado en /data/usuarios.json`);
  }
}

module.exports = UserModel;