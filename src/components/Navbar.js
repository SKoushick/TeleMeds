import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <div className="nav-brand">
          <Link to="/" className="nav-logo">
            <h2>TeleMeds</h2>
          </Link>
        </div>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/buy-medicine" className="nav-link">Buy Medicine</Link>
          </li>
          <li className="nav-item">
            <Link to="/find-doctors" className="nav-link">Find Doctors</Link>
          </li>
          <li className="nav-item">
            <Link to="/ai-chatbot" className="nav-link">AI ChatBot</Link>
          </li>
          <li className="nav-item">
            <Link to="/health-records" className="nav-link">Health Records</Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-link">About</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
