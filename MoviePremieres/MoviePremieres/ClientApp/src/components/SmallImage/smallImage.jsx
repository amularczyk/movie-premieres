import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

class SmallImage extends Component {
  static goBack() {
    window.history.back();
  }

  render() {
    const {
      src,
      alt,
      bottomMargin,
    } = this.props;

    const Image = styled.img`
      height: 60px;
      width: 50px;
      margin-bottom: ${bottomMargin}px;
    `;

    return (
      <Image src={src} alt={alt} />
    );
  }
}

SmallImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  bottomMargin: PropTypes.number,
};

SmallImage.defaultProps = {
  bottomMargin: 0,
};

export default SmallImage;
