import {
  getMoviesRequest,
  getMoviesSuccess,
} from '../constants/moviesConstants';

const initialState = { movies: [], isLoading: false };

// eslint-disable-next-line import/prefer-default-export
export const reducer = (state, action) => {
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
};
