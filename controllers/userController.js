const UserModel = require('../models/userModel');

class UserController {
  static async authenticate(req, res) {
    const emailUser = req.body.emailUser;
    const user = UserModel.getByEmail(emailUser)
    
    let statusCode;
    if (user) statusCode = 200;
    else {
      UserModel.createStudent(emailUser);
      statusCode = 201;
    }

    res.status(statusCode).json({ redirect: '/simulaciones' });
  }
}

module.exports = UserController;