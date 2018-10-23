import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { moviesActions } from '../../store/actions/moviesActions';
import { styles } from './styles.css';

class Movies extends Component {
  componentDidMount() {
    const { requestMovies } = this.props;
    requestMovies();
  }

  render() {
    const { movies } = this.props;
    return (
      <div className={`${styles}`}>
        <h1>Movies premieres</h1>
        <Table>
          <thead>
            <tr>
              <th />
              <th>Title</th>
              <th>Premiere</th>
            </tr>
          </thead>
          <tbody>
            { movies.map(movie => (
              <tr key={movie.id}>
                <td><img src={movie.imageUrl} alt={movie.title} /></td>
                <td><Link to={`/movie/${movie.id}`}>{movie.title}</Link></td>
                <td>{new Date(movie.premiereDate).toLocaleDateString('en-GB')}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

Movies.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object),
  requestMovies: PropTypes.func.isRequired,
};

Movies.defaultProps = {
  movies: [],
};

export default connect(
  state => state.moviesStore,
  dispatch => bindActionCreators(moviesActions, dispatch),
)(Movies);
