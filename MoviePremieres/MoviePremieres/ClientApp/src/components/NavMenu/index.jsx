import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Glyphicon, Nav, Navbar, NavItem,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { styles } from './styles.css';

class NavMenu extends Component {
  render() {
    return (
      <div className={`${styles}`}>
        <Navbar inverse fixedTop fluid collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">MoviePremieres</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <LinkContainer to="/" exact>
                <NavItem>
                  <Glyphicon glyph="home" />
                  {' '}
Movies
                </NavItem>
              </LinkContainer>
              <LinkContainer to="/add-movie" exact>
                <NavItem>
                  <Glyphicon glyph="home" />
                  {' '}
Add new movie
                </NavItem>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default NavMenu;
