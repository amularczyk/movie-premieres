import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../store/MoviesStore';

class Movies extends Component {
    componentWillMount() {
        this.props.requestMovies();
    }

    render() {
        return (
            <div>
                <h1>Movies premieres</h1>
                <button onClick={() => { this.props.addNewMovie({title: "Movie 1"})}}>Add new movie</button>
                <p>This component contains movies premieres</p>
                {renderMoviesTable(this.props)}
            </div>
        );
    }
}

function renderMoviesTable(props) {
  return (
    <table className='table'>
      <thead>
        <tr>
          <th>Title</th>
          <th>Premiere</th>
        </tr>
      </thead>
      <tbody>
        {props.movies.map(movie =>
          <tr key={movie.title}>
            <td>{movie.title}</td>
            <td>{movie.premiereDate}</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default connect(
  state => state.moviesStore,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(Movies);
