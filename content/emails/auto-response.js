const EmailContent = {
  registrationResponseFor(newUser) {
    const {username, email, bnetId} = newUser;
    return ({
      from: 'no-reply@teamhearthleague.com',
      to: email,
      subject: 'Welcome to Team Hearth League!',
      text: `Hello, ${username}!
  
We're glad you have joined, however this is simply a placeholder email. In the future, a more thoughtful email would be sent.
  
Please review your registration information and make sure it is correct:
      username: ${username}
      email address: ${email}
      Battle.net ID: ${bnetId}
  
Thanks!`
    })
  }
}

module.exports = EmailContent;