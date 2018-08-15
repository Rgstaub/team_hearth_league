const Mailgun = require('mailgun-js');

const Email = {
  send: {
    registrationResponse(newUser) {
      console.log(process.env.MAILGUN_API_KEY)
      console.log(process.env.MAILGUN_DOMAIN)
      
      let mailgun = new Mailgun({apikey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN})
      const { email, username, bnetId } = newUser;
      const data = {
        from: 'admin@teamhearthleague.com',
        to: email,
        subject: 'Welcome to Team Hearth League!',
        body: `Hello, ${username}!

We're glad you have joined, however this is simply a placeholder email. In the future, a more thoughtful email would be sent.

Please review your registration information and make sure it is correct:
  username: ${username}
  email address: ${email}
  Battle.net ID: ${bnetId}

Thanks!`
      }

      mailgun.messages.send(data, function (error, body) {
        if (error) {
          res.render('error', {error: error});
        } else {
          res.send("Attachment is on its way");
          console.log("attachment sent", fp, body);
        }
      })
    },
  }
}



module.exports = Email;  