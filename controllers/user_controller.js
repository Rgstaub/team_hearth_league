'use strict';

//var User = require('../models/users_model.js');

const db = require('../models/');

class UserController {
  

  findUserById(userId) {
    return new Promise((resolve, reject) => {
      db.users.findById(userId)
      .then( user => resolve(user) )
      .catch( err => reject(err) )
    })
  }
  
  findUserByEmail(email) {
    return new Promise((resolve, reject) => {
      db.users.findOne({
        where: {
          email: email
        }
      })
      .then( user => resolve(user) )
      .catch( err => reject(err) )
    })
  }

  // findUserByUsernamePassword(username, password) {
  //   return new Promise((resolve, reject) => {

  //     validateUserByUsernamePassword(username, password)
  //       .then(user => {
  //         resolve(user)
  //       })
  //       .catch(err => {
  //         reject(err)
  //       })

  //   })
  // }

  findOneAndUpdate(id, properties) {
    return new Promise((resolve, reject) => {

      findOneAndUpdate(id, properties)
        .then(user => {
          resolve(user)
        })
        .catch(err => {
          reject(err)
        })

    })
  }

  findOne(id) {
    return new Promise((resolve, reject) => {

      findOne(id)
        .then(user => {
          //console.log(user.photoUrl)
          resolve(user)
        })
        .catch(err => {
          reject(err)
        })

    })
  }

  makePasswordResetLink(email) {
    return new Promise((resolve, reject) => {

      var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
      console.log(fullUrl);
      db.users.findOne()
        .then(user => {
          // With the user found, create a token and update it to the user
          user.createToken(function(token) {
            findOneAndUpdateToken(user, token, (user) => {

              var date = new Date().getTime()
              setTokenExpiration(user.id, date);

              const resetLink = buildLink(user.id, token, baseUrl);
              resolve(resetLink);
            })
          })
        })
        .catch(err => {

          reject(createErrorObject('User Name', 'Username not found'))
        })
    })
  }

  resetPassword(userId, password) {
    return new Promise((resolve, reject) => {
      resetPasswordById(userId, password)
        .then(response => {
          resolve(response);
        })
        .catch(err => {
          reject(err);
        })
    })
  }

  addMission(userId, missionId, role) {

    console.log("ADD MISSION")
    return new Promise((resolve, reject) => {
      console.log(missionId);
      findOne(userId)
      .then( user => {
        insertMission(user, missionId, role)
        .then(status => {
          resolve(status)
        })
        .catch( err => {
          reject({errors: err, message: "Mission could not be added to this user", result: 500})
        })
      })
      .catch(err => {
        reject({
          errors: err,
          message: "User was not found",
          result: 500
        })
      })
    })
  }

  validateToken(token, userId) {
    return new Promise((resolve, reject) => {

      findOne(userId)
        .then(user => {
          
          if (user.reset_token === token) {

            const date = new Date().getTime();
            if (user.token_expires > date ) {
              resolve(true);
            } else {
              console.log("TOKEN EXPIRED")
              reject(createErrorObject('token', 'Password Reset Link has expired'));
            }
          } else {
            reject(createErrorObject('token', 'Invalid reset token'));
          }
          
        })
        .catch(err => {
          reject(err);
        })
      
    })
  }

  collectUsers(userIds) {

    return new Promise ((resolve, reject) => {
  
      User.find({
        '_id': { $in: userIds }
      })
      .then(users => {
        resolve(users);
      })
      .catch(err => {
        reject({errors: err, message: 'Could not lookup list of users for this mission'});
  
      })
    })
  }
}


function handleErrors(err) {

  if (err.errors) {
    return createErrorObjects(err)
  } else {
    if (err.code === 11000) {
      return createErrorObject("username", "already exists")
    } else {
      return err
    }
  }
}

function createErrorObject(key, type) {
  return {
    field: key,
    type: type
  }
}

function createErrorObjects(err) {
  var errorsToReturn = [];

  for (let [key, value] of Object.entries(err.errors)) {
    let errObj = createErrorObject(key, value.kind)

    if (value.properties) {
        if (value.properties.minlength) {
          errObj.minlength = value.properties.minlength
        }
        if (value.properties.maxlength) {
          errObj.maxlength = value.properties.maxlength
        }
    }

    errorsToReturn.push(errObj);
  }

  return errorsToReturn;
}

function addNewUser(userObj) {
  return new Promise((resolve, reject) => {
    // Adds it to the MondoDB and responds with the newly created user object
    console.log(userObj)
    new User(userObj)
    
      .save()
      .then((user) => {
        resolve(user)
      })
      .catch((err) => {
        reject(err)
      })
  })
}


function validateUserByUsernamePassword(username, password) {
  return new Promise((resolve, reject) => {

    User.findOne({username: username})
      .then((foundUser) => {

        // if not found, kick out
        if (!foundUser) {
          reject(createErrorObject('User Name', `User ${username} was not found`))
          return;
        }

        // if user found, check password and kick out
        foundUser.comparePassword(password, (err, isMatch) => {
          if (err) {
            reject(err)
            return;
          } 

          // resolve if passwords match, reject otherwise
          if (isMatch) {
            resolve(foundUser)
          } else {
            reject(createErrorObject('Password','Invalid password'))
          }
        })
      })
  })
}

//==========================================================
//==========================================================

function findOneAndUpdate(id, properties) {
  return new Promise((resolve, reject) => {
    
    User.findOneAndUpdate({_id: id}, properties)
      .then((user) => {
        resolve(user)
      })
      .catch((err) => {
        reject({err: err, props: properties, id: id})
      })
  })
}

function insertMission(user, missionId, role) {
  return new Promise((resolve, reject) => {


    User.update(
      { _id: user._id},
      { $addToSet: {
        missions: missionId
        }
      }
    )
    .then(status => {
      console.log(status);

      resolve(status)
    })
    .catch(err => 
      reject(
        {errors: err, result: 500, message: `Unable to add mission to ${user.fullName}`}
      )
    )

  })
}

//==========================================================
//==========================================================



function findOne(id) {
  return new Promise((resolve, reject) => {
    User.findOne({_id:id})
      .then((user) => {
        resolve(user)
      })
      .catch((err) => {
        console.log(err);
        reject({errors: err, result: 500, message: "User not found"});
      })
  })
}

function resetPasswordById(id, password) {
  return new Promise((resolve, reject) => {

    User.findOne({_id: id})
      .then(user => {
        user.password = password;
        user.save();
        resolve(user);
      })
      .catch(err => {
        reject(err);
      })
  })
}

function setTokenExpiration(id, date) {
  const expiration = date + 60000;
  User.findByIdAndUpdate(id, {token_expires: expiration})
    .then(result => {
      console.log(result);
    })
}

// Get a User by only username
function findOneByUsername(userName) {
  return new Promise((resolve, reject) => {

    User.findOne({username: userName})
      .then(user => {
        console.log(user)
        resolve(user)
      })
      .catch(err => {
        reject(err)
      })
  })
}

function findOneAndUpdateToken(user, token, cb) {
  return new Promise((resolve, reject) => {
    // User.findByIdAndUpdate(user._id, {reset_token: token}, (err, user) => {
    //   if (err) return handleErrors(err);

    //   cb(user);
    // })
    User.findByIdAndUpdate(user._id, {reset_token: token})
      .then(user => {
        resolve(cb(user));
      })
      .catch(err => {
        reject(err);
      })
  })

}



function buildLink(id, token, baseUrl) {
  console.log('buildLink id: ' + id);
  let link = baseUrl + '/reset_password/?id=' + id + "&token=" + token;
  console.log(link);
  return link;


}

module.exports = new UserController();
