import React, { Component } from 'react';
import Home from './components/Home'
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import  Navbar from './components/Navbar';

class App extends Component {

  handleChange = event => {
    const {name, value} = event.target
    this.setState({[name]: value });
    console.log(this.state.thing)
  };

  render() {
    return (
      <div>
        <Navbar />
        <Home />
      </div>
    );
  }
}

// class App {
//   constuctor(name) {
//     this.name = name;
//     this.debt = 0;
//   }
//   addDebt(amount) {
//     this.debt -= amount;
//     return this.debt;
//   }
// }
//
// const bob = new App('bob')
// console.log(bob);



export default App;
