
const userController = require('../../controllers/userController');
const authController = require('../../controllers/auth/authController');

module.exports = function(app) {
  // Create a new user and respond with the newly created user object
  app.post('/api/user', (req, res) => {

    userController.createUser({
      fullName: req.body.fullName,
      email: req.body.email,
      password: req.body.password
    }).then(user => {
        console.log("Got user - returning to create")
        req.session.user = user;
        res.json(user);

      })
      .catch(err => {

        res.json({ result: 500, error: err })
      })
  })

  // Attempt to log in a user and return the matching user object if successful
  app.post('/api/user/login/', (req, res) => {
    userController.findUserByUsernamePassword(req.body.username, req.body.password)
      .then(user => {
        // log user in
        authController.logUserIn(req, user);

        // return user object
        res.json(user.toJSON());
      })
      .catch(err => {
        //console.log(err);
        res.json({ result: 500, error: err })
      })
  })


  app.post('/api/user/add-mission', (req, res) => {
    //console.log(req.body)

    missionController.findMission({ publicId: req.body.publicId })
      .then(mission => {
        //console.log(mission._id);
        userController.addMission(req.session.user.id, mission._id, req.body.role)
        .then( status => {

          if (req.body.role === "member") {
            missionController.insertIntoMissionArray(mission._id, "members", req.session.user.id)
            .then( response => {
              //console.log(response)
              res.json(response);
            })
            .catch( err => {
              console.log("insert into mission array err")
              res.json(err)
            })
          } else if (req.body.role === "donor") {
            missionController.insertIntoMissionArray(mission._id, "members", req.session.user.id)
            .then( response => {
              //console.log(response)
              res.json(response);
            })
            .catch( err => {
              console.log("insert into mission array err")
              res.json(err)
            })
          } else res.json({error: "invalid role", result: 400})
          
        })
        .catch( err => res.json(err))
      })  
      .catch( err => res.json(err))     

    
  })
   

  // Log out a session
  app.post('/api/user/logout', (req, res) => {
    req.session.regenerate( function(err) {
      if (err) {
        res.json(err);
      } else {
        res.sendStatus(200);
      }
    })
  })

  // Get a user object by sending the userid
  app.get('/api/user/:userid', (req, res) => {
    if (req.params.userid === authController.getCurrentUserId(req)) {
      userController.findOne(req.params.userid)
        .then(user => {
          res.json(user)
        })
        .catch(err => {
          res.json({ result: 500, error: err })
        })
    } else {
      res.json({ result: 401, error: "Not authorized"})
    }
  })

  // Updates a specified user's Full Name. Returns the updated user.
  app.patch('/api/user/name/:userid', (req, res) => {
    userController.findOneAndUpdate(req.params.userid, req.body.fullName)
      .then(user => {
        console.log("Got user - returning to user")
        res.json(user)
      })
      .catch(err => {
        console.log("Error found:", err)
        res.json({ result: 500, error: err })
      })
  })

  // Receive a request to reset password from a specified username
  app.post('/api/user/reset/:username', (req,res) => {
    let baseUrl = req.protocol + '://' + req.get('host'); 

    userController.makePasswordResetLink(req.params.username, baseUrl)
      .then(link => {
        res.json(link);
      })
      .catch(err => {
        res.json({result: 500, error: err});
      })
  })

  // Accept a reset token, validate, and route to authenticated pw reset page
  app.get('/reset_password/', (req, res) => {
    userController.validateToken(req.query.token, req.query.id)
      .then(valid => {

        if (valid === true) {
          userController.findOne(req.query.id)
            .then(user => {
              res.render('authorized-reset', {name: user.fullName});
          })
        } else if (!valid) {
          res.send("Invalid reset url");
        } else {
          res.send("Something went wrong")
        }
      })
      .catch(err => {
        console.log("Error found:", err)
        res.render('pw_reset', { result: 500, error: err })
      })
    
  })

  app.patch('/api/user/password', (req, res) => {
    userController.validateToken(req.body.token, req.body.id)
    .then(valid => {
      //console.log(req.body);
      if (valid === true) {
        userController.resetPassword(req.body.id, req.body.newPassword)
        .then(response => {
          
          res.sendStatus(200);
        })
        .catch(err => {
          console.log("Error found:", err)
          res.json({ result: 500, error: err })
        })
        
      }
    })
    .catch(err => {
      console.log("Error found:", err)
      res.json({ result: 500, error: err })
    })
  })
}