const db = require('../models/');

const UserCon = {

  updateUserResetToken: (id, token) => {
    return new Promise( (resolve, reject) => {
      db.users.update( { 
        pwResetToken: token,
        pwTokenExpiration: Date.now() + 30000 // 30 second expiration
      }, 
      { where: { id: id }} )
      .then( response => resolve(response) )
      .catch( err => reject(err) )
    })
    
  }
}

module.exports = UserCon;