import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { SingleDatePicker } from 'react-dates';
import PropTypes from 'prop-types';
import moment from 'moment';
import { moviesActions } from '../../store/actions/moviesActions';
import Title from '../../components/Title/title';
import './styles.css';

class Movie extends Component {
  constructor(props, context) {
    super(props, context);

    this.onDateChange = this.onDateChange.bind(this);
    this.saveMovie = this.saveMovie.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
    this.editMovieOnClick = this.editMovieOnClick.bind(this);

    this.state = {
      title: '',
      premiereDate: null,
      premiereDateFocused: false,
      imageUrl: '',
      filmwebUrl: '',
      editable: false,
      oldTitle: '',
      oldPremiereDate: null,
      oldImageUrl: '',
      oldFilmwebUrl: '',
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
        oldTitle: movie.title,
        oldPremiereDate: movie.premiereDate,
        oldImageUrl: movie.imageUrl,
        oldFilmwebUrl: movie.filmwebUrl,
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
      oldTitle: title,
      oldPremiereDate: premiereDate,
      oldImageUrl: imageUrl,
      oldFilmwebUrl: filmwebUrl,
    });
  }

  cancelEdit() {
    const {
      oldTitle, oldPremiereDate, oldImageUrl, oldFilmwebUrl, editable,
    } = this.state;

    this.setState({
      editable: !editable,
      title: oldTitle,
      premiereDate: oldPremiereDate,
      imageUrl: oldImageUrl,
      filmwebUrl: oldFilmwebUrl,
    });
  }

  editMovieOnClick() {
    const { editable } = this.state;
    this.setState({ editable: !editable });
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
      <div>
        <Title text={title} />
        {!editable && (
          <Button
            bsStyle="success"
            className="no-left-margin button-margins"
            onClick={this.editMovieOnClick}
          >
            {'Edit'}
          </Button>
        )}
        {editable && (
          <Button
            className="no-left-margin button-margins"
            onClick={this.cancelEdit}
          >
            {'Cancel'}
          </Button>
        ) }
        {editable && <Button className="button-margins" onClick={this.saveMovie}>Save</Button>}
        {!editable && imageUrl && (
          <div>
            <img className="small-image margin-bottom-big" src={imageUrl} alt={title} />
          </div>
        )}

        <form>
          <Form.Group controlId="movieTile">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              placeholder="Enter title"
              onChange={e => this.setState({ title: e.target.value })}
              disabled={!editable}
            />
            <Form.Control.Feedback />
          </Form.Group>

          <Form.Group controlId="moviePremiereDate">
            <Form.Label>Premiere date</Form.Label>
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
          </Form.Group>

          {editable && imageUrl && (
            <div>
              <img className="small-image margin-bottom-medium" src={imageUrl} alt={title} />
            </div>
          )}

          {editable && (
            <Form.Group controlId="movieImageUrl">
              <Form.Label>Image link</Form.Label>
              <Form.Control
                type="text"
                value={imageUrl}
                placeholder="Enter image link"
                onChange={e => this.setState({ imageUrl: e.target.value })}
                disabled={!editable}
              />
              <Form.Control.Feedback />
            </Form.Group>
          )}

          {editable ? (
            <Form.Group controlId="movieFilmwebUrl">
              <Form.Label>Filmweb link</Form.Label>
              <Form.Control
                type="text"
                value={filmwebUrl}
                placeholder="Enter filmweb link"
                onChange={e => this.setState({ filmwebUrl: e.target.value })}
                disabled={!editable}
              />
              <Form.Control.Feedback />
            </Form.Group>
          )
            : <Button bsStyle="link" className="no-padding"><a href={filmwebUrl}>Filmweb link</a></Button>
          }
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
