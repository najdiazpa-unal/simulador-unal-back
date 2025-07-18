const { writeJSON } = require('../utils');
const users = require('../data/usuarios.json');
const usersPath = './data/usuarios.json';

class UserModel {
  static getByEmail(emailUser) {
    return users.find(user => user.correo === emailUser);
  }

  static create(emailUser, rol) {
    const newUser = { correo: emailUser, rol };
    users.push(newUser);
    writeJSON(usersPath, users);
    console.log(`${rol.toUpperCase()} "${emailUser}" creado en /data/usuarios.json`);
  }
}

module.exports = UserModel;