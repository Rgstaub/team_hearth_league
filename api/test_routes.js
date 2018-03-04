'use strict'

const db = require("../models");
//const passport = require('passport');

//========================| Test Routes |=========================

module.exports = function(app, passport) {
  console.log("test_route has connected");

  app.post('/login', 
    
    passport.authenticate('local'),
    function(req, res) {
      console.log("################################################");
      res.json(req.user);
    }
  )

  app.get('/test', (req, res) => {
    
    req.user
      ? res.json({status: 200, message: "Succesfull authentication"})
      : res.json({ status:401, message: "unauthorized"})
  })
} 