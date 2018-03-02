
const UserController = require('../controllers/user_controller.js');

module.exports = function(app) {

  app.post('/newUser/', (req, res) => {
    console.log("NEW USER ROUTE");
    // UserController.createUser()
    // res.json({
    //   status: 200,
    //   message: "route hit",heroku 
    //   payload: req.body
    // })

    UserController.createUser(req.body)
    .then( response => res.json(response ))
    .catch( err => res.json(err))

  })


}  