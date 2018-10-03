import {
    requestMoviesStoreType,
    receiveMoviesStoreType
} from "../constants/moviesConstants";

const initialState = { movies: [], isLoading: false };


export const reducer = (state, action) => {
    state = state || initialState;

    if (action.type === requestMoviesStoreType) {
        return {
            ...state,
            isLoading: true
        };
    }

    if (action.type === receiveMoviesStoreType) {
        return {
            ...state,
            movies: action.movies,
            isLoading: false
        };
    }

    return state;
};
