import React, { Component } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import NavMenu from '../NavMenu';

class Layout extends Component {
  render() {
    const { children } = this.props;
    return (
      <Container fluid>
        <Row>
          <Col sm={3}>
            <NavMenu />
          </Col>
          <Col sm={9}>
            {children}
          </Col>
        </Row>
      </Container>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Layout;
