import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import styled from 'styled-components';

class EditButton extends Component {
  static goBack() {
    window.history.back();
  }

  render() {
    const {
      editingMode,
      editOnClick,
      cancelOnClick,
      saveOnClick,
    } = this.props;

    const ButtonWithMargin = styled(Button)`
      margin-top: 5px;
      margin-left: 10px;
      margin-bottom: 15px;
    `;

    const ButtonWithHorizontalMargin = styled(Button)`
      margin-top: 5px;
      margin-bottom: 15px;
    `;

    return (
      <div>
        {!editingMode ? (
          <ButtonWithHorizontalMargin variant="primary" onClick={editOnClick}>
            Edit
          </ButtonWithHorizontalMargin>
        ) : (
          <div>
            <ButtonWithHorizontalMargin variant="danger" onClick={cancelOnClick}>
              Cancel
            </ButtonWithHorizontalMargin>
            <ButtonWithMargin variant="success" onClick={saveOnClick}>Save</ButtonWithMargin>
          </div>
        )}
      </div>
    );
  }
}

EditButton.propTypes = {
  editingMode: PropTypes.bool,
  editOnClick: PropTypes.func.isRequired,
  cancelOnClick: PropTypes.func.isRequired,
  saveOnClick: PropTypes.func.isRequired,
};

EditButton.defaultProps = {
  editingMode: false,
};

export default EditButton;
