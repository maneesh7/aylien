import React from 'react';
import logo from '../../assets/logo.svg';
import './NavBar.scss';

const Navbar = () => {
  return (
    <nav>
      <div className="navbar">
        <img src={logo} alt="logo" className="logo" />
      </div>
    </nav>
  );
};

export default Navbar;
