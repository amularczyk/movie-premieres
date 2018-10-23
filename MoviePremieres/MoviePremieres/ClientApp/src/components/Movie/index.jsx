import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Button, FormGroup, ControlLabel, FormControl,
} from 'react-bootstrap';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { SingleDatePicker } from 'react-dates';
import PropTypes from 'prop-types';
import moment from 'moment';
import { moviesActions } from '../../store/actions/moviesActions';
import { styles } from './styles.css';

class Movie extends Component {
  constructor(props, context) {
    super(props, context);

    this.onDateChange = this.onDateChange.bind(this);
    this.saveMovie = this.saveMovie.bind(this);

    this.state = {
      title: '',
      premiereDate: null,
      premiereDateFocused: false,
      imageUrl: '',
      filmwebUrl: '',
      editable: false,
    };
  }

  componentDidMount() {
    const { match: { params: { id } }, requestMovie } = this.props;

    const callback = (movie) => {
      this.setState({
        title: movie.title,
        premiereDate: movie.premiereDate,
        imageUrl: movie.imageUrl,
        filmwebUrl: movie.filmwebUrl,
      });
    };

    requestMovie({ id, callback });
  }

  onDateChange(date) {
    const dateValue = moment.utc({
      year: date.year(),
      month: date.month(),
      day: date.date(),
    });
    this.setState({ premiereDate: dateValue });
  }

  saveMovie() {
    const { match: { params: { id } }, updateMovie } = this.props;
    const {
      title, premiereDate, imageUrl, filmwebUrl,
    } = this.state;

    updateMovie({
      id, title, premiereDate, imageUrl, filmwebUrl,
    });

    this.setState({
      editable: false,
    });
  }

  render() {
    const {
      title,
      premiereDate,
      premiereDateFocused,
      imageUrl,
      filmwebUrl,
    } = this.state;
    const { editable } = this.state;

    return (
      <div className={`${styles}`}>
        <h1>{title}</h1>
        <Button
          className="no-left-margin"
          onClick={() => this.setState({ editable: !editable })}
        >
          {!editable ? 'Edit' : 'Cancel'}
        </Button>
        {editable && <Button onClick={() => this.saveMovie()}>Save</Button>}
        {imageUrl && (
          <div>
            <img src={imageUrl} alt={title} />
          </div>
        )}

        <form>
          <FormGroup controlId="movieTile">
            <ControlLabel>Title</ControlLabel>
            <FormControl
              type="text"
              value={title}
              placeholder="Enter title"
              onChange={e => this.setState({ title: e.target.value })}
              disabled={!editable}
            />
            <FormControl.Feedback />
          </FormGroup>

          <FormGroup controlId="moviePremiereDate">
            <ControlLabel>Premiere date</ControlLabel>
            <div>
              <SingleDatePicker
                onDateChange={this.onDateChange}
                date={premiereDate}
                focused={premiereDateFocused}
                onFocusChange={({ focused }) => this.setState({ premiereDateFocused: focused })}
                isOutsideRange={() => false}
                disabled={!editable}
              />
            </div>
          </FormGroup>

          <FormGroup controlId="movieImageUrl">
            <ControlLabel>Image link</ControlLabel>
            <FormControl
              type="text"
              value={imageUrl}
              placeholder="Enter image link"
              onChange={e => this.setState({ imageUrl: e.target.value })}
              disabled={!editable}
            />
            <FormControl.Feedback />
          </FormGroup>

          <FormGroup controlId="movieFilmwebUrl">
            <ControlLabel>Filmweb link</ControlLabel>
            <FormControl
              type="text"
              value={filmwebUrl}
              placeholder="Enter filmweb link"
              onChange={e => this.setState({ filmwebUrl: e.target.value })}
              disabled={!editable}
            />
            <FormControl.Feedback />
          </FormGroup>
        </form>
      </div>
    );
  }
}

Movie.propTypes = {
  requestMovie: PropTypes.func.isRequired,
  updateMovie: PropTypes.func.isRequired,
  match: PropTypes.shape({
    path: PropTypes.string,
    url: PropTypes.string,
    isExact: PropTypes.bool,
    params: PropTypes.object,
  }).isRequired,
};

export default connect(
  state => state.movieStore,
  dispatch => bindActionCreators(moviesActions, dispatch),
)(Movie);
