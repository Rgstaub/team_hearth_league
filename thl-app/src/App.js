

import React, { Component } from 'react';
import Cookies from 'universal-cookie';

// import { withCookies, Cookies } from 'react-cookie';
// import { instanceOf } from 'prop-types';
import './App.css';

import LoginButton from './components/LoginButton';

const cookies = new Cookies();

class App extends Component {


  constructor(props) {
    super(props);
    this.state={

      message: "Hello World!"
    }
  }
  
  setCookie(cookie) {
    console.log(cookie);
    const keys = Object.keys(cookie.cookie);
    console.log(keys);
    cookies.set('id', cookie.id, {path: '/'});
    keys.forEach( key => {
      cookies.set(key, cookie.cookie[key]);
    })
  }

  componentWillMount() {
    
    cookies.set('myCat', 'Pacman', {path: '/'});

    this.setState(cookies);
  }



  render() {

    return (
      <div className="App">

          
        <LoginButton 
          setCookie={this.setCookie}
          otherProps="Hi There"
        />
        {this.state.cookies.myCat}

      </div>
    );
  }
}

export default App;
