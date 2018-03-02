
const UserController = require('../controllers/user_controller.js');

module.exports = function(app) {

  app.post('public/newUser/', (req, res) => {
    UserController.createUser(req.body)
    .then( newUser => res.json(newUser ))
    .catch( err => res.json(err))
  })

}  