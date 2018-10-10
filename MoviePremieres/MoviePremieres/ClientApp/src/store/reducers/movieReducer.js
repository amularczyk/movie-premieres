import {
    getMovieRequest,
    getMovieSuccess
} from "../constants/moviesConstants";

const initialState = { movie: {}, isLoading: false };


export const reducer = (state, action) => {
    state = state || initialState;

    if (action.type === getMovieRequest) {
        return {
            ...state,
            isLoading: true
        };
    }

    if (action.type === getMovieSuccess) {
        return {
            ...state,
            movie: action.movie,
            isLoading: false
        };
    }

    return state;
};
