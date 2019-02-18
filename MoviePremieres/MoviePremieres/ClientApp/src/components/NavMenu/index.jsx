import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import styled from 'styled-components';

const Div = styled.div`
  height: 100%;
`;

const StyledNavbar = styled(Navbar)`
  height: 100%;
  display: block;

  @media (max-width: 768px) {
    .navbar-toggler {
      display: block;
      float: right;
    }
    .navbar-collapse {
      display: none !important;
    }
  }
`;

class NavMenu extends Component {
  render() {
    return (
      <Div>
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
      </Div>
    );
  }
}

export default NavMenu;
