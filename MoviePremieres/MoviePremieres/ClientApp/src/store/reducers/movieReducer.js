import {
  getMovieRequest,
  getMovieSuccess,
} from '../constants/moviesConstants';

const initialState = { movie: {}, isLoading: false };

export default function reducer(state, action) {
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
}
