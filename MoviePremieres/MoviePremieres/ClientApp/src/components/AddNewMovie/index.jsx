import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Button, FormGroup, ControlLabel, FormControl,
} from 'react-bootstrap';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { SingleDatePicker } from 'react-dates';
import { moviesActions } from '../../store/actions/moviesActions';
import './styles.css';

class AddNewMovie extends Component {
  constructor(props) {
    super(props);

    this.getTitleValidationState = this.getTitleValidationState.bind(this);
    this.addMovie = this.addMovie.bind(this);

    this.state = {
      title: '',
      premiereDate: null,
      premiereDateFocused: false,
      imageUrl: '',
      filmwebUrl: '',
    };
  }

  getTitleValidationState() {
    const length = this.state.title.length;
    if (length > 2) return 'success';
    if (length > 0) return 'error';
    return null;
  }

  addMovie() {
    const { addNewMovie } = this.props;
    const {
      title, premiereDate, imageUrl, filmwebUrl,
    } = this.state;

    addNewMovie({
      title, premiereDate, imageUrl, filmwebUrl,
    });

    this.setState({
      title: '',
      premiereDate: null,
      premiereDateFocused: false,
      imageUrl: '',
      filmwebUrl: '',
    });
  }

  render() {
    const {
      title, premiereDate, premiereDateFocused, imageUrl, filmwebUrl,
    } = this.state;

    return (
      <div>
        <h1>Add new movie</h1>
        {imageUrl && <img src={imageUrl} />}

        <form>
          <FormGroup controlId="addNewMovieTile" validationState={this.getTitleValidationState()}>
            <ControlLabel>Title</ControlLabel>
            <FormControl
              type="text"
              value={title}
              placeholder="Enter title"
              onChange={e => this.setState({ title: e.target.value })}
            />
            <FormControl.Feedback />
          </FormGroup>

          <FormGroup controlId="addNewMoviePremiereDate">
            <ControlLabel>Premiere date</ControlLabel>
            <div>
              <SingleDatePicker
                onDateChange={date => this.setState({ premiereDate: date })}
                date={premiereDate}
                focused={premiereDateFocused}
                onFocusChange={({ focused }) => this.setState({ premiereDateFocused: focused })}
                isOutsideRange={() => false}
              />
            </div>
          </FormGroup>

          <FormGroup controlId="addNewMovieImageUrl">
            <ControlLabel>Image link</ControlLabel>
            <FormControl
              type="text"
              value={imageUrl}
              placeholder="Enter image link"
              onChange={e => this.setState({ imageUrl: e.target.value })}
            />
            <FormControl.Feedback />
          </FormGroup>

          <FormGroup controlId="addNewMovieFilmwebUrl">
            <ControlLabel>Filmweb link</ControlLabel>
            <FormControl
              type="text"
              value={filmwebUrl}
              placeholder="Enter filmweb link"
              onChange={e => this.setState({ filmwebUrl: e.target.value })}
            />
            <FormControl.Feedback />
          </FormGroup>
        </form>
        <Button type="submit" onClick={() => this.addMovie()}>Add new movie</Button>
      </div>
    );
  }
}

export default connect(
  state => state.moviesStore,
  dispatch => bindActionCreators(moviesActions, dispatch),
)(AddNewMovie);
