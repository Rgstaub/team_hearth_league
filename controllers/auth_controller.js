
const db = require('../models/');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;
const uuid = require('uuid/v4');
const UserController = require('./user_controller.js');

const AuthController = {

  createUser(newUser) {
    return new Promise((resolve, reject) => {

      // check that email, username, or bnetId are not in use already
      db.users.findAll({
        where: {
          username: newUser.username,
          bnetId: newUser.bnetId,
          email: newUser.email
        }
      })

      //hash the password before saving a new user
      bcrypt.hash(newUser.password, SALT_WORK_FACTOR)
      .then( hash => {
        db.users.create({
          username: newUser.username,
          password: hash,
          bnetId: newUser.bnetId,
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


function findUserByEmail(email) {
  return new Promise((resolve, reject) => {
    db.users.find({
      where: {
        email: email
      }
    })
    .then( user => {
      resolve(user)
    })
    .catch( err => {
      reject(err);
    })
  })
}

function findUserByUsername() {
  return new Promise((resolve, reject) => {
    db.users.find({
      where: {
        username: username
      }
    })
    .then( user => {
      resolve(user)
    })
    .catch( err => {
      reject(err);
    })
  })
}

function findUserByBnetId() {
  return new Promise((resolve, reject) => {

  })
}


module.exports = AuthController;