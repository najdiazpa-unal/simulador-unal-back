const { v4: uuidv4 } = require('uuid');
const UserModel = require('../models/userModel');

class UserController {
  static async authenticate(req, res) {
    const emailUser = req.body.emailUser;
    let user = UserModel.getByEmail(emailUser)
    
    let statusCode;
    if (user) {
      statusCode = 200;
    } else {
      UserModel.create(uuidv4(), emailUser, 'estudiante');
      user = UserModel.getByEmail(emailUser); // Obtener el usuario recién creado
      statusCode = 201;
    }

    res.status(statusCode).json({
      redirect: (user.rol === 'estudiante') ? '/simulaciones' : '/admin/asignaturas',
      userId: user.id,
      userRole: user.rol
    });
  }
}

module.exports = UserController;