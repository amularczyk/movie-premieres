import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Image = styled.img`
  height: 60px;
  width: 50px;
  margin-bottom: ${props => props.bottomMargin}px;
`;

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

    return (
      <Image src={src} alt={alt} bottomMargin={bottomMargin}/>
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
