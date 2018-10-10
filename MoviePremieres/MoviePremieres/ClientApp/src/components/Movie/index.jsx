import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

import { SingleDatePicker } from 'react-dates';

import { moviesActions } from '../../store/actions/moviesActions';
import './styles.css';

class Movie extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            title: '',
            premiereDate: null,
            premiereDateFocused: false,
            imageUrl: '',
            filmwebUrl: ''
        };
    }

    render() {
        const { title, premiereDate, premiereDateFocused, imageUrl, filmwebUrl } = this.state;

        return (
            <div>
                <h1>Add new movie</h1>

                <form>
                    <FormGroup controlId="movieTile">
                        <ControlLabel>Title</ControlLabel>
                        <FormControl
                            type="text"
                            value={title}
                            placeholder="Enter title"
                            disabled
                        />
                        <FormControl.Feedback />
                    </FormGroup>

                    <FormGroup controlId="moviePremiereDate">
                        <ControlLabel>Premiere date</ControlLabel>
                        <div>
                            <SingleDatePicker
                                onDateChange={date => this.setState({ premiereDate: date })}
                                date={premiereDate}
                                focused={premiereDateFocused}
                                onFocusChange={({ focused }) => this.setState({ premiereDateFocused: focused })}
                                disabled
                            />
                        </div>
                    </FormGroup>

                    <FormGroup controlId="movieImageUrl">
                        <ControlLabel>Image link</ControlLabel>
                        <FormControl
                            type="text"
                            value={imageUrl}
                            placeholder="Enter image link"
                            disabled
                        />
                        <FormControl.Feedback />
                    </FormGroup>

                    <FormGroup controlId="movieFilmwebUrl">
                        <ControlLabel>Filmweb link</ControlLabel>
                        <FormControl
                            type="text"
                            value={filmwebUrl}
                            placeholder="Enter filmweb link"
                            disabled
                        />
                        <FormControl.Feedback />
                    </FormGroup>
                </form>
            </div>
        );
    }
}

export default connect(
  state => state.moviesStore,
  dispatch => bindActionCreators(moviesActions, dispatch)
)(Movie);
