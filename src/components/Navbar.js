import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const logo = require("./images/logo.png");

export default class Navbar extends Component {
  render() {
    return (
      <ul className="navbar">
        <li className="navbar__logo">
        <img className='logo' src={logo} alt="logo" height='60px' />
          <a href="/">Julius</a>
        </li>
        <div>
          <Link href="/event" to="/event">
            My Event
          </Link>
          <Link href="/" to="/">
            Create New Event
          </Link>
        </div>
      </ul>
    );
  }
}
