'use strict'

// =====================| Server |==============================

// Dependency libraries
const mongoose   = require('mongoose');
const express = require("express");
const bodyParser = require("body-parser");
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const path = require('path');
const cors = require('cors')

// Create the app and set the port
const app = express();
const PORT = process.env.PORT || 3001;

// Sequelize
const db = require("./models");

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
  store: new MongoStore({ url: 'mongodb://localhost/thl_sessions' }),
  cookie: {
    path: '/',
    httpOnly: true,
    secure: false,
    maxAge:  259200000  // Three days
  }
}));

// Call our routes
require("./api/test_routes.js")(app);
require("./api/public_routes.js")(app);


process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
  // application specific logging, throwing an error, or other logic here
});

// // Leaving handlebars here just in case...
// const exphbs = require("express-handlebars");
// app.engine("handlebars", exphbs({ defaultLayout: "main" }));
// app.set("view engine", "handlebars");



// Sync the sequelize models and start the app
db.sequelize.sync({})
.then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
}).catch( err => res.json(err));
