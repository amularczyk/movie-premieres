import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import moment from 'moment';
import styled from 'styled-components';
import { moviesActions } from '../../store/actions/moviesActions';
import Title from '../../components/Title/title';
import EditButton from '../../components/EditButton/editButton';
import SmallImage from '../../components/SmallImage/smallImage';
import SingleDatePicker from '../../components/SingleDatePicker/singleDatePicker';

const ButtonWithoutPadding = styled(Button)`
  padding: 0;
`;

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
        <Title text={title} showBackButton />
        <EditButton
          editingMode={editable}
          editOnClick={this.editMovieOnClick}
          cancelOnClick={this.cancelEdit}
          saveOnClick={this.saveMovie}
        />

        {!editable && imageUrl && (
          <SmallImage src={imageUrl} alt={title} bottomMargin={15} />
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
            <SingleDatePicker
              onDateChange={this.onDateChange}
              date={premiereDate}
              focused={premiereDateFocused}
              onFocusChange={({ focused }) => this.setState({ premiereDateFocused: focused })}
              disabled={!editable}
            />
          </Form.Group>

          {editable && imageUrl && (
            <SmallImage src={imageUrl} alt={title} bottomMargin={10} />
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
            : <ButtonWithoutPadding variant="link" href={filmwebUrl}>Filmweb link</ButtonWithoutPadding>
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
