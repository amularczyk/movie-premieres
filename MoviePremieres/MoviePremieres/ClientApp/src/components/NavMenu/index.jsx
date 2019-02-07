import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { styles } from './styles.css';

class NavMenu extends Component {
  render() {
    return (
      <div className={`${styles}`}>
        <Navbar>
          <Navbar.Brand>
            <Link to="/">MoviePremieres</Link>
            <Navbar.Toggle />
            <LinkContainer to="/" exact>
              <NavItem>Movies</NavItem>
            </LinkContainer>
            <LinkContainer to="/add-movie" exact>
              <NavItem>Add new movie</NavItem>
            </LinkContainer>
          </Navbar.Brand>
        </Navbar>
      </div>
    );
  }
}

export default NavMenu;
