'use strict'

const db = require("../models");
const passport = require('passport');

//========================| Test Routes |=========================

module.exports = function(app) {
  console.log("test_route has connected");

  app.post('/login',
    passport.authenticate('local'),
    function(req, res) {
      // If this function gets called, authentication was successful.
      // `req.user` contains the authenticated user.
      res.send(req.user.toJSON());
    }
  );

} 