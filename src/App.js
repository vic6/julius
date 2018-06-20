import React, { Component } from 'react';
import { Container} from 'semantic-ui-react';
import Home from './components/Home'
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
      // <div className="App">
      //   <header className="App-header">
      //     <img src={logo} className="App-logo" alt="logo" />
      //     <h1 className="App-title">Welcome to {this.state.stuff}</h1>
      //   </header>
      //   <p className="App-intro">
      //     To get started, edit <code>src/App.js</code> and save to reload.
      //   </p>
      //   <input onChange={this.handleChange} name='thing' type='text' value={this.state.thing} />
      // </div>
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
