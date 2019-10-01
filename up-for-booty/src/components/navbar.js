import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import store from "../store";
import { Button, ButtonGroup } from 'reactstrap';


export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { language: store.getLanguage() };
  }
  componentDidMount() {
    this._isMounted = true;
    //the method to react on store changes
    this.languageChange = (lang) => this.setState({ language: lang });
    //subscribe to store 
    store.subscribeToChanges(this.languageChange)
  }
  componentWillUnmount() {
    this._isMounted = false;
    store.unsubscribeToChanges(this.languageChange);
  }

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand logo" id="bold">BOOTY</Link>
        <div className="collpase navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <Link to="/" className="nav-link logo">Booties</Link>
            </li>
            <li className="navbar-item">
              <Link to="/add" className="nav-link logo">{this.state.language === 'eng' ? 'Add a booty' : 'Lägg till en booty'}</Link>
            </li>
          </ul>
        </div>
        <ButtonGroup>
          <Button onClick={() => store.setLanguage('eng')}>English</Button>
          <Button onClick={() => store.setLanguage('sve')}>Svenska</Button>
        </ButtonGroup>
      </nav>
    );
  }
}