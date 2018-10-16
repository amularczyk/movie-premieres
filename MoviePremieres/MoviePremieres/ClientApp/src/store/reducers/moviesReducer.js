import {
  getMoviesRequest,
  getMoviesSuccess,
} from '../constants/moviesConstants';

const initialState = { movies: [], isLoading: false };

export default function reducer(state, action) {
  const newState = state || initialState;

  if (action.type === getMoviesRequest) {
    return {
      ...newState,
      isLoading: true,
    };
  }

  if (action.type === getMoviesSuccess) {
    return {
      ...newState,
      movies: action.movies,
      isLoading: false,
    };
  }

  return newState;
}
