
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

  validateNewUser(newUser) {
    return new Promise ((resolve, reject) => {

      Promise.all([
        findUserByBnetId(newUser.bnetId),
        findUserByEmail(newUser.email),
        findUserByUsername(newUser.username)
      ])
      .then( results => {
        if (results[0]) {
          results[0] = "That Battle.net ID is already in use";
        }
        if (results[1]) {
          results[1] = "That email address is already in use";
        }
        if (results[2]) {
          results[2] = "That username is already in use";
        }
        resolve( results.filter( result => result !== null ) )
      })
      .catch( err => reject(err) )
    })
  }


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

function findUserByUsername(username) {
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

function findUserByBnetId(bnetId) {
  return new Promise((resolve, reject) => {
    db.users.find({
      where: {
        bnetId: bnetId
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

function validateEmail(email) {
  // parse the email
  if (!validEmail) {
    return ({
      err: "invalid email",
      message: "The provided email address is invalid"
    })
  } else {
    return null
  }
}

function validateUsername(username) {

}

function validatePassword(password) {

}

function validateBnetId(bnetId) {

}


module.exports = AuthController;