import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import styled from 'styled-components';

class Title extends Component {
  goBack = () => {
    window.history.go(-1);
  }

  render() {
    const {
      text,
      showBackButton,
    } = this.props;

    const Text = styled.h1`
      display: inline-block;
      padding-left: 50px;
      line-height: 50px;
    `;

    const Div = styled.div`
      display: inline-block;
      line-height: 50px;
      position: absolute;
      margin-bottom: 8px;

      button {
        border-radius: 50%;
      }
    `;

    return (
      <div>
        {showBackButton && (
          <Div>
            <Button
              variant="dark"
              onClick={this.goBack}
            >
              {'<'}
            </Button>
          </Div>
        )}
        <Text>{text}</Text>
      </div>
    );
  }
}

Title.propTypes = {
  text: PropTypes.string.isRequired,
  showBackButton: PropTypes.bool,
};

Title.defaultProps = {
  showBackButton: false,
};

export default Title;
