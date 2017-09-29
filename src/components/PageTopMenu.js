import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, NavbarToggler, Collapse, Nav, NavItem, NavLink as BsNavLink } from 'reactstrap';

const PageTopMenu = () => {
  this.state = {};

  return (
    <div>
      <Nav tabs>
        <NavItem>
          <NavLink to='/editor'>
            Editor
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to='/validator'>
            Validator
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to='/diff'>
            Diff
          </NavLink>
        </NavItem>
      </Nav>
    </div>
  );
};

export default PageTopMenu;
