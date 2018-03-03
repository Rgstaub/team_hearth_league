
const UserController = require('../controllers/user_controller.js');
const AuthController = require('../controllers/auth_controller.js');
const RegistrationController = require('../controllers/registration_controller.js')

module.exports = function(app) {

  app.post('/public/newUser/', (req, res) => {
    AuthController.createUser(req.body)
    .then( newUser => res.send(newUser.toJSON()) )
    .catch( err => res.json(err))
  })

}  