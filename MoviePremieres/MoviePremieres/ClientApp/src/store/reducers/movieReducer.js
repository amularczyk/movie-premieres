import {
  getMovieRequest,
  getMovieSuccess,
} from '../constants/moviesConstants';

const initialState = { movie: {}, isLoading: false };

// eslint-disable-next-line import/prefer-default-export
export const reducer = (state, action) => {
  const newState = state || initialState;

  if (action.type === getMovieRequest) {
    return {
      ...newState,
      isLoading: true,
    };
  }

  if (action.type === getMovieSuccess) {
    return {
      ...newState,
      movie: action.movie,
      isLoading: false,
    };
  }

  return newState;
};
