﻿import {
    getMoviesRequest,
    getMoviesSuccess
} from "../constants/moviesConstants";

const initialState = { movies: [], isLoading: false };


export const reducer = (state, action) => {
    state = state || initialState;

    if (action.type === getMoviesRequest) {
        return {
            ...state,
            isLoading: true
        };
    }

    if (action.type === getMoviesSuccess) {
        return {
            ...state,
            movies: action.movies,
            isLoading: false
        };
    }

    return state;
};