import React, { Component } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, Nav, NavItem, NavLink } from 'reactstrap';

export default class Bootymenu extends Component {
  


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
    <Navbar expand="md"  fixed={`top`} color="info" dark>
    <NavbarBrand href="/"><i className="fas fa-heart fontawesome bootyheart"></i> <span className="bootynavheader">UpForBooty</span></NavbarBrand>
      <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
        <Collapse isOpen={!this.state.collapsed} navbar>
         <Nav navbar>
          <NavItem>
              <NavLink href="/about">About</NavLink>
          </NavItem>
          <NavItem>
              <NavLink href="/add">Add a booty</NavLink>
          </NavItem>
          </Nav>
        </Collapse>
    </Navbar>
    );
  }
}