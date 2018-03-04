'use strict'

const db = require("../models");
//const passport = require('passport');

//========================| Test Routes |=========================

module.exports = function(app, passport) {
  console.log("test_route has connected");

  app.post('/login', 
    
    passport.authenticate('local'),
    (req, res) => {
      res.json(req.user);
    }
  )

  app.get('/test', (req, res) => {
    
    req.user
      ? res.json({ status: 200, message: req.user.username })
      : res.json({ status:401, message: "unauthorized"})
  })

  app.get('/logout', (req, res) => {

  })
} 