'use strict'

// =====================| Server |==============================

// Dependency libraries
const mongoose   = require('mongoose');
const express = require("express");
const bodyParser = require("body-parser");
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const path = require('path');
const cors = require('cors');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// Create the app and set the port
const app = express();
const PORT = process.env.PORT || 3001;

// Sequelize
const db = require("./models");

// Set the correct URL for the MongoDB based on the envirnomnent  
const mongoUrl = process.env.MONGODB_URI
  ? process.env.MONGODB_URI
  : 'mongodb://localhost/thl_sessions';

// Mongoose
mongoose.Promise = global.Promise;

// Use middleware for parsing req.body data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(cors());

// Static directory
app.use(express.static(path.join(__dirname, '../../thl-app/build')));


app.use(session({
  secret: '-v^-itsasecrettoeveryone-^v-',
  resave: false,
  saveUninitialized: true,
  name: 'id',
  store: new MongoStore({ url: mongoUrl }),
  cookie: {
    path: '/',
    httpOnly: true,
    secure: false,
    maxAge:  259200000  // Three days
  }
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  console.log(user);
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  db.users.findById(id)
  .then( user => {
    done(null, user);
  })

});

passport.use(new LocalStrategy({
    usernameField: 'email'
  }, 
  function(email, password, done) {
    //console.log("$$$$$$$$$$$$$$$$$$$$$$$$$")
    db.users.findOne({ where: { email: email }})
    .then( user => {
      console.log(user.password);
      //console.log(err);
      //if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (user.password !== password) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

// Call our routes
require("./api/test_routes.js")(app, passport);
require("./api/public_routes.js")(app, passport);


process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
  // application specific logging, throwing an error, or other logic here
});

// Sync the sequelize models and start the app
db.sequelize.sync({})
.then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
}).catch( err => console.log(err));
