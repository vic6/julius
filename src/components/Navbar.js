import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

export default class Navbar extends Component {
  render() {
    return (
      <ul className="navbar">
        <li href='/' className="navbar__logo">Julius</li>
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
