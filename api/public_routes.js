
//const UserController = require('../controllers/user_controller.js');
const AuthController = require('../controllers/auth_controller.js');

module.exports = function(app, passport) {

  app.post('/public/register/', (req, res) => {
    AuthController.validateNewUser(req.body)
    .then( issues => {
      if ( issues.length < 1 ) {
        AuthController.createUser(req.body)
        .then( newUser => { 
          console.log(newUser);
          res.json(newUser)
         })
      } else {
        let errors = { err: issues}
        console.log(errors);
        res.send(errors)
      }
    })
    .catch( err => res.json(err) )
  })

  app.get('/api/auth/welcome', (req, res) => {
    console.log(req.headers)
    req.user ?
      //console.log(res.user.username)
      res.send({ 
        status: 200,
        username: req.user.username,
        email: req.user.email,
        id: req.user.id,
        
      })
      : res.send({ 
        status: 401,
        message: 'You need to log in' })
  })

  app.post('/logout', (req, res) => {
    // let username = req.user.username;
    req.logout();
    res.json({
      status: 200,
      message: `User has been logged out`,
    })
  })

  // TODO: Get specific message about why login failed from the local strategy,
  // using a callback in passport.authenticate
  app.post('/login', 
    passport.authenticate('local'),
    (req, res) => {
      res.send(req.user);
    }
  )

  app.post('/reset-password', (req, res) => {
    AuthController.makePasswordResetLink(req.body.email)
    .then( response => {
      res.json(response);
    })
  })

  app.get('/pwreset/', (req, res) => {
    AuthController.validateToken(req.query.token, req.query.id)
    .then( result => res.json(result) )
  })

  

}  