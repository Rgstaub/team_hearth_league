'strict';

import React, { Component } from 'react';
import './NewUserForm.css';

class NewUserForm extends Component {
  
  constructor(props) {
    super(props);

    this.state={
      username: "",
      email: "",
      battlenetId: "",
      password: "",
      passwordConfirm: "",
      ready: false,
      passwordConfirmMessage: "",
      emailMessage: "",
      passwordMessage: ""
    }
  }

  handleInputChange(event) {
    const field = event.target.name;
    const value = event.target.value;
    // eslint-disable-next-line
    switch(field) {
      case "email":
        this.setState({ email: value }, () => this.checkReady());
        break;
      case "username":
        this.setState({ username: value }, () => this.checkReady());
        break;
      case "battlenetId":
        this.setState({ battlenetId: value }, () => this.checkReady());
        break;
      case "password":
        this.setState({ password: value }, () => this.checkReady());
        break;
      case "passwordConfirm":
        this.setState({ passwordConfirm: value }, () => this.checkReady())
    } 
  }

  validateEmail(email) {
    // eslint-disable-next-line
    const re = /^(([^<>()[\]{}'^?\\.,!|//#%*-+=&;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    this.setState({ emailMessage: ""});
    if (re.test(email)) {
      return true;
    } else {
      this.setState({ emailMessage: "Invalid email address"});
      return false;
    }
  }

  validatePassword(password) {
    const passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})");
    if (passwordRegex.test(password)) {
      this.setState({ passwordMessage: ""});
      return true;
    } else {
      this.setState({ passwordMessage: "Passwords must be at least 6 characters long, and include at least one capital letter and one number"});
      return false;
    }
  }

  validatePasswordConfirm(passwordConfirm) {
    if (passwordConfirm === this.state.password) {
      this.setState({ passwordConfirmMessage: "" });
      return true
    } else {
      this.setState({ passwordConfirmMessage: "Passwords do not match"});
      return false
    }
  }

  checkReady() {
    if (this.state.username &&
      this.state.email &&
      this.state.password &&
      this.state.passwordConfirm &&
      this.state.battlenetId
    ) {
      if (this.validateEmail(this.state.email) &&
          this.validatePassword(this.state.password) &&
          this.validatePasswordConfirm(this.state.passwordConfirm)
      ) {
        this.setState({ ready: true});
      } else {
        this.setState({ ready: false });
      }
    } else {
      this.setState({ ready: false });
    }
  }

  submitForm(event) {
    event.preventDefault();
    
    this.props.onNewUserSubmit(
      {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
        battlenetId: this.state.battlenetId
      }
    )
  }

  render() {
    return (
      <div className="new-user-form">
        <form>
          <div className="form-group">
            <label htmlFor="new-user-form-username">THL username</label>
            <input type="text" className="form-control" id="new-user-form-username" name="username" placeholder="The name you will go by" 
              onChange={ event => this.handleInputChange(event) }
            />
          </div>
          <div className="form-group">
            <label htmlFor="new-user-form-email">Email address</label>
            <input type="email" className="form-control" id="new-user-form-email" name="email" placeholder="Enter email" 
              onChange={ event => this.handleInputChange(event) }
              onBlur={ event => this.validateEmail(event.target.value)}
            />
            <p className="error-message">{this.state.emailMessage}</p>
          </div>
          <div className="form-group">
            <label htmlFor="new-user-form-password">Password</label>
            <input type="password" className="form-control" name="password" id="new-user-form-password" placeholder="Password" 
              onChange={ event => this.handleInputChange(event) }
              onBlur={ event => this.validatePassword(event.target.value)}
            />
            <p className="error-message">{this.state.passwordMessage}</p>
          </div>
          <div className="form-group">
            <label htmlFor="new-suer-form-password-confirm">Confirm Password</label>
            <input type="password" className="form-control" name="passwordConfirm" id="new-suer-form-password-confirm" placeholder="Repeat password" 
              onChange={ event => this.handleInputChange(event) }
              onBlur={ event => this.validatePasswordConfirm(event.target.value)}
            />
            <p className="error-message">{this.state.passwordConfirmMessage}</p>
          </div>
          <div className="form-group">
            <label htmlFor="new-user-form-battlenetid">Battle.net ID</label>
            <input type="text" className="form-control" name="battlenetId" id="new-user-form-battlenetid" placeholder="YourBattleNetID#12345" 
              onChange={ event => this.handleInputChange(event) } 
            />
          </div>
          <button type="submit" disabled={!this.state.ready} onClick={ event => this.submitForm(event) } className="btn btn-primary">Submit</button>
        </form>
      </div>
    );
  }
}

export default NewUserForm;
