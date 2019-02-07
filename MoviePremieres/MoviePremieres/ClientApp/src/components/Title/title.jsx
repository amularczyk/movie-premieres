import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './title.css';

class Title extends Component {
  static goBack() {
    window.history.back();
  }

  render() {
    const {
      text,
      showBackButton,
    } = this.props;

    return (
      <div>
        {!showBackButton && (
          <div
            className="title-div"
          >
            <Button
              className="title-button"
              onClick={this.goBack}
            >
              {'<'}
            </Button>
          </div>
        )}
        <h1 className="title-text">{text}</h1>
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
