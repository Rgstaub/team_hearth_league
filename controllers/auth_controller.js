
const db = require('../models/');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;
const uuid = require('uuid/v4');
const UserController = require('./user_controller.js');

const AuthController = {

  createUser(newUser) {
    return new Promise((resolve, reject) => {
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
  },


  makePasswordResetLink(email) {
    return new Promise((resolve, reject) => {

      findUserByEmail(email).then( user => {
        // With the user found, create a token and update it to the user
        // user.createToken(function(token) {

      
        findUserAndUpdateToken(user.id, token).then( () => {
          const url = `${req.protocol}://${req.get('host')}/pwreset/?id=${user.id}&amp;token=${token}`
          resolve(url)
        })
          
        //   , (user) => {

        //       var date = new Date().getTime()
        //       setTokenExpiration(user.id, date);

        //       const resetLink = buildLink(user.id, token, baseUrl);
        //       resolve(resetLink);
        //     })
        //   })
        // })
        
      }).catch(err => reject(err))
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

}

function validateUsername(username) {

}

function validatePassword(password) {

}

function validateBnetId(bnetId) {

}


module.exports = AuthController;