

import React, { Component } from 'react';

import './App.css';

import LoginButton from './components/LoginButton';


class App extends Component {


  constructor(props) {
    super(props);
    this.state={

      message: "Hello World!"
    }
  }

  componentWillMount() {

  }


  render() {

    return (
      <div className="App">

        <LoginButton 
          otherProps="Hi There"
        />
        

      </div>
    );
  }
}

export default App;
