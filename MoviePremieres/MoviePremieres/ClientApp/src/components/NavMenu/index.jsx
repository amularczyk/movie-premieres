import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import styled from 'styled-components';

class NavMenu extends Component {
  render() {
    const StyledNavbar = styled(Navbar)`
      display: block;

      @media (max-width: 768px) {
        .navbar-toggler {
          display: inline-block;
          float: right;
        }
        .navbar-collapse {
          display: none !important;
        }
      }
    `;

    return (
      <div>
        <StyledNavbar bg="light">
          <Navbar.Brand href="/">MoviePremieres</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="flex-column">
              <Nav.Link href="/">Movies</Nav.Link>
              <Nav.Link href="/add-movie">Add new movie</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </StyledNavbar>
      </div>
    );
  }
}

export default NavMenu;
