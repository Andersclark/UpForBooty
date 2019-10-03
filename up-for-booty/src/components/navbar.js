import React, { Component } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, Nav, NavItem, NavLink, Button, ButtonGroup } from 'reactstrap';
import store from "../store";
import { Link } from 'react-router-dom';


export default class Bootymenu extends Component {

  constructor(props) {
    super(props);
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      language: store.getLanguage(),
      collapsed: true,
      fixed: true,
    };
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
  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }
  render() {
    return (
      <Navbar expand="md" fixed={`top`} color="info" dark>
        <Link to="/">
          <NavbarBrand ><i className="fas fa-heart fontawesome bootyheart"></i> <span className="bootynavheader">UpForBooty</span></NavbarBrand>
        </Link>
        <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
        <Collapse isOpen={!this.state.collapsed} navbar>
          <Nav navbar>
            <NavItem>
              <Link to="/add" >
                <NavLink className="nav-link logo">{this.state.language === 'eng' ? 'Add a booty' : 'Lägg till en booty'}</NavLink>
              </Link>
            </NavItem>
            <ButtonGroup className="mr-auto">
              <Button onClick={() => store.setLanguage('eng')}><img src='/engFlag.png' className="flagStyle" alt="american flag" /></Button>
              <Button onClick={() => store.setLanguage('sve')}><img src='/sweFlag.png' className="flagStyle" alt="swedish flag" /></Button>
            </ButtonGroup>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}