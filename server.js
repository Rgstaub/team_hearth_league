'use strict'

// =====================| Server |==============================

// Dependency libraries
const mongoose   = require('mongoose');
const express = require("express");
const bodyParser = require("body-parser");
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const path = require('path');

// Create the app and set the port
const app = express();
const PORT = process.env.PORT || 3001;

// Sequelize
const db = require("./models");

app.use(session({
  secret: '-v^-itsasecrettoeveryone-^v-',
  resave: false,
  saveUninitialized: false,
  name: 'id',
  store: new MongoStore({ url: 'mongodb://localhost/thl_sessions' }),
  cookie: {
    path: '/',
    httpOnly: true,
    secure: false,
    maxAge:  259200000  // Three days
  }
}));

// Mongoose
mongoose.Promise = global.Promise;

// Use middleware for parsing req.body data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Static directory
app.use(express.static(path.join(__dirname, 'public')));

// // Leaving handlebars here just in case...
// const exphbs = require("express-handlebars");
// app.engine("handlebars", exphbs({ defaultLayout: "main" }));
// app.set("view engine", "handlebars");

// Call our routes
require("./api/test_routes.js")(app);

// Sync the sequelize models and start the app
db.sequelize.sync({})
.then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
}).catch( err => res.json(err));
