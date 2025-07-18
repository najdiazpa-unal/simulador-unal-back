const { argv } = require('node:process');
const UserModel = require('./models/userModel');

UserModel.create(argv[2], 'admin');