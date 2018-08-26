const mailgun = require('mailgun-js')({apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN});

const emailContent = require('../content/emails/auto-response.js');

const Email = {
  send: {
    registrationResponse(newUser) {
      return new Promise((resolve, reject) => {
        const data = emailContent.registrationResponseFor(newUser);
  
        mailgun.messages().send(data, function (error, body) {
          if (error) {
            reject(error);
          } else {
            resolve(body);
          }
        })
      })
    }
  }
}



module.exports = Email;  