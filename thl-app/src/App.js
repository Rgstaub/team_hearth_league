import React, { Component } from 'react';
import './App.css';

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state={
      users: {},
      message: "Hello World!"
    }
  }
  
  componentDidMount() {
    fetch('/read')
    .then(res => console.log(res))
    .then(res => this.setState({ users: res }) );
  }
  

  render() {
    return (
      <div className="App">
        {this.state}
      </div>
    );
  }
}

export default App;
