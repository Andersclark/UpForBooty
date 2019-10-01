import React, { Component } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import store from "../store";
import { Button, ButtonGroup } from 'reactstrap';

export default class Bootymenu extends Component {

  constructor(props) {
    super(props);
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = { 
        language: store.getLanguage() 
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


  constructor(props) {
    super(props);
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true,
      fixed: true,
    };
  }
  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }
  render() {
    return (
              <Link to="/add" className="nav-link logo"></Link>
    <Navbar expand="md"  fixed={`top`} color="info" dark>
    <NavbarBrand href="/"><i className="fas fa-heart fontawesome bootyheart"></i> <span className="bootynavheader">UpForBooty</span></NavbarBrand>
      <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
        <Collapse isOpen={!this.state.collapsed} navbar>
         <Nav navbar>
          <NavItem>
              <NavLink href="/about">About</NavLink>
          </NavItem>
          <NavItem>
              <NavLink href="/add">{this.state.language === 'eng' ? 'Add a booty' : 'Lägg till en booty'}</NavLink>
          </NavItem>
          </Nav>
        </Collapse>
        <ButtonGroup>
          <Button onClick={() => store.setLanguage('eng')}>English</Button>
          <Button onClick={() => store.setLanguage('sve')}>Svenska</Button>
        </ButtonGroup>
    </Navbar>
        
    );
  }
}