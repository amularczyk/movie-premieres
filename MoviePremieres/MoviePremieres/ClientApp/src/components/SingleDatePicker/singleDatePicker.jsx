import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { SingleDatePicker as DatePicker } from 'react-dates';
import styled from 'styled-components';

const DivContainingStylesForDatePicker = styled.div`
  .DateInput {
    width: 92px;
  }

  .SingleDatePickerInput__withBorder {
    border: none !important;
  }

  .DateInput_input {
    color: #555 !important;
    font-size: 14px !important;
    line-height: 1.42857143 !important;
    padding: 6px 12px !important;
    background-color: #fff !important;
    background-image: none !important;
    border: 1px solid #ccc !important;
    border-radius: 4px !important;
  }

  .DateInput_input__disabled {
    background: #eee !important;
    font-style: normal !important;
  }
`;

class SingleDatePicker extends Component {
  render() {
    const {
      onDateChange,
      date,
      focused,
      onFocusChange,
      disabled
    } = this.props;

    return (
      <DivContainingStylesForDatePicker>
        <DatePicker
          onDateChange={onDateChange}
          date={date}
          focused={focused}
          onFocusChange={onFocusChange}
          isOutsideRange={() => false}
          disabled={disabled}
        />
      </DivContainingStylesForDatePicker>
    );
  }
}

SingleDatePicker.propTypes = {
  onDateChange: PropTypes.func.isRequired,
  onFocusChange: PropTypes.func.isRequired,
  date: PropTypes.object.isRequired,
  focused: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
};

SingleDatePicker.defaultProps = {
  disabled: false
}

export default SingleDatePicker;
