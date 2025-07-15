const UserModel = require('../models/userModel');

class UserController {
  static async authenticate(req, res) {
    const emailUser = req.body.emailUser;
    const user = await UserModel.getByEmail({ emailUser })
    
    let statusCode;
    if (user) statusCode = 200;
    else {
      UserModel.createStudent({ emailUser });
      statusCode = 201;
    }

    res.redirect(statusCode, '/simulaciones');
  }
}

module.exports = UserController;