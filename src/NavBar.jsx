import React from "react";
import {Link} from "react-router-dom"
import './NavBar.css'

function NavBar() {
  return (
    <nav className="navbar-container">
      <div className="navbar-top">DEV@Deakin</div>
      <input 
        type="text"
        className="navbar-input"
        placeholder="Search"
      />
      <div className="link">
        <button className="button">About</button>
        <Link to="/login">
          <button className="button">Log In</button>
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;