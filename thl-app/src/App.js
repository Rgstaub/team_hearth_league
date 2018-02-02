import React, { Component } from 'react';
import './App.css';

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state={

      message: "Hello World!"
    }
  }
  
  // When the app starts, do this
  componentDidMount() {
  
  }
  

  render() {
    return (
      <div className="App">
        {this.state.message}
      </div>
    );
  }
}

export default App;
