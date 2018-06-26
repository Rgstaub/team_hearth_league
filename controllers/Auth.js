const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require("../models");
const bcrypt = require('bcrypt');


passport.serializeUser( (user, done) => {
  done(null, user.id);
});

passport.deserializeUser( (id, done) => {
  db.users.findById(id)
  .then( user => {
    done(null, user);
  })
});

passport.use(new LocalStrategy({
    usernameField: 'email'
  }, 
  function(email, password, done) {
    db.users.findOne({ where: { email: email }})
    .then( user => {

      if (!user) {
        console.log("INCORRECT USERNAME")
        return done(null, false, { message: 'Incorrect username.' });
      }
      const validPassword = validatePassword(user, password)
      .then( valid => {
        if (!valid) {
          console.log("INCORRECT PASSWORD")
          return done(null, false, { message: 'Incorrect password.' });
        }
        console.log("CORRECT")
        console.log(user);
        return done(null, user);
      })
    })
      
    .catch( err => {
      return done(err);
    } );
  }  
));

function validatePassword(user, password) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, user.password)
    .then( res => {
      console.log("Correct password: " + res)
      resolve(res);
    })
    .catch( err => reject(err) );
  })
}

module.exports = passport;