'use strict'

const db = require("../models");

//========================| Test Routes |=========================

module.exports = function(app) {
  console.log("test_route has connected");

  // add a game
  app.get('/add-one', (req, res) => {
    console.log("PING");
    
    db.games.create({
      gameName: "A Test Game",
      numPlayers: 3
    })
    .then( response => res.send(response) );
  })

  // check existing games
  app.get('/read', (req, res) => {
    
    db.games.findAll({})
    .then( games => res.send(games));
  })

  app.get('/login', (req, res) => {
    console.log("ROUTE HIT");
    console.log(req.session.id);
    res.send({
      id: req.session.id,
      cookie: req.session.cookie
    });
  })

} 