import React, { Component } from 'react';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Event from './components/Event';

class App extends Component {



  render() {
    return (
      <div>
        <Router>
          <div>
            <Navbar />
            <Route exact path="/" render={() => <Home />} />
            <Route exact path="/event" render={() => <Event />} />
          </div>
        </Router>
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
