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
const passport = require('./controllers/Auth');
const flash = require('connect-flash');


// Create the app and set the port
const app = express();
const PORT = process.env.PORT || 3001;

console.log(process.env);

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
app.use(flash());



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
