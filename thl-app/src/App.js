

import React, { Component } from 'react';

import './App.css';

//import LoginButton from './components/LoginButton';
import NewUserForm from './components/NewUserForm';

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
        <NewUserForm />

        

      </div>
    );
  }
}

export default App;
