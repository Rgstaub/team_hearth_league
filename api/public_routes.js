
const UserController = require('../controllers/user_controller.js');
const AuthController = require('../controllers/auth_controller.js');
const RegistrationController = require('../controllers/registration_controller.js')

module.exports = function(app) {

  app.post('/public/register/', (req, res) => {
    AuthController.validateNewUser(req.body)
    .then( issues => {
      if ( issues.length < 1 ) {
        AuthController.createUser(req.body)
        .then( newUser => res.json(newUser) )
      } else {
        res.send({
          err: [issues]
        })
      }
    })
    .catch( err => res.json(err) )
  })

  app.post('/logout', (req, res) => {
    let username = req.user.username;
    req.logout();
    res.json({
      status: 200,
      message: `User ${username} has been logged out`,
    })
  })

}  