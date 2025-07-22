const { v4: uuidv4 }  = require('uuid');
const UserModel       = require('../models/userModel');
const SimulacionModel = require('../models/SimulacionModel');  

class UserController {
  static async authenticate (req, res) {
    const emailUser   = req.body.emailUser;
    let   user        = UserModel.getByEmail(emailUser);

    let statusCode;
    if (user) {
      statusCode = 200;
    } else {
      UserModel.create(uuidv4(), emailUser, 'estudiante');
      user       = UserModel.getByEmail(emailUser);
      statusCode = 201;
    }

    const removedAsignaturas = SimulacionModel.purgeRemovedAsignaturas(user.id);

    res.status(statusCode).json({
      redirect           : user.rol === 'estudiante'
                            ? '/simulaciones'
                            : '/admin/asignaturas',
      userId             : user.id,
      userRole           : user.rol,
      removedAsignaturas 
    });
  }
}

module.exports = UserController;
