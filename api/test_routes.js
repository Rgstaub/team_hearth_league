'use strict'

const db = require("../models");
const passport = require('passport');

//========================| Test Routes |=========================

module.exports = function(app) {
  console.log("test_route has connected");

  app.post('/login',
    passport.authenticate('local', { successRedirect: '/',
                                    failureRedirect: '/login',
                                    failureFlash: true }
    )
  );

} 