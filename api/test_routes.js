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
    console.log(fullUrl);
    req.user
      ? res.json({ status: 200, message: req.user.username })
      : res.json({ status:401, message: "unauthorized"})
  })

  app.post('/validate', (req, res) => {
    AuthController.validateNewUser(req.body)
    .then( response => res.json(response))
  })

} 