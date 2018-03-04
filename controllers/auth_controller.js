
const db = require('../models/');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;
const uuid = require('uuid/v4');
const UserController = require('./user_controller.js');

const AuthController = {

  createUser(newUser) {
    return new Promise((resolve, reject) => {
      //hash the password before
      bcrypt.hash(newUser.password, SALT_WORK_FACTOR)
      .then( hash => {
        db.users.create({
          username: newUser.username,
          password: hash,
          battlenetId: newUser.battlenetId,
          email: newUser.email
        })
        .then((user) => {
          resolve(user)
        })
        .catch((err) => {
          reject(err);
        })
      })
    })
  },



}





module.exports = AuthController;