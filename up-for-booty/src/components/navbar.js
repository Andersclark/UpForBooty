import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import store from "../store";

export default class Navbar extends Component {

  render() {
    let language = store.getLanguage();
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand logo" id="bold">BOOTY</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/" className="nav-link logo">Booties</Link>
          </li>
          <li className="navbar-item">
          <Link to="/add" className="nav-link logo">{language === 'eng' ? 'Add a booty' : 'Lägg till en booty'}</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}