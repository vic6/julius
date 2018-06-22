import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

export default class Navbar extends Component {
  render() {
    return(
      <div className='navbar'>
        <Link href='/' to='/'>
          Julius
        </Link>
      </div>
    )
  }
}
