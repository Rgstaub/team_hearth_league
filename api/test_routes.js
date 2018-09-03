'use strict'

const db = require("../models");
const AuthController = require('../controllers/auth_controller')
const Email = require('../controllers/email_controller')
//const passport = require('passport');

//========================| Test Routes |=========================

module.exports = function(app, passport) {
  console.log("test_route has connected");

  app.get('/email', (req, res) => {
    Email.send.registrationResponse({email: 'rgstaub@gmail.com', username: 'JediNinja', bnetId: 'JediNinja#1486'});
  })

  app.get('/test', (req, res) => {
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    //console.log(fullUrl);
    req.user
      ? res.json({ status: 200, message: req.user.username })
      : res.json({ status:401, message: "unauthorized"})
  })

  app.post('/validate', (req, res) => {
    AuthController.validateNewUser(req.body)
    .then( response => res.json(response))
  })

  app.post('/test-login', passport.authenticate( 'local', { failWithError: true}),
    (req, res, next) => {
      // Handle success
      return res.send({ success: true, message: 'Logged in' })
    },
    (err, req, res, next) => {
      // Handle error
      return res.status(401).send({ success: false, message: err })
    }
    
  )
  app.post('/test-login2', (req, res, next) => {
    passport.authenticate( 'local', (err, user, info) => {
      console.log("WARMING UP", err, user, info)
      if (err) throw err;
      if (!user) res.send(info);
      if (user) res.send(user);
    })(req, res, next)

  }
)

} 