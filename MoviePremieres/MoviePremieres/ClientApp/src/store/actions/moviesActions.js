import {
    getMoviesRequest,
    getMoviesSuccess,
    addNewMovieRequest,
    addNewMovieSuccess,
    getMovieRequest,
    getMovieSuccess
} from "../constants/moviesConstants";

import moment from "moment";

export const moviesActions = {
    requestMovies: () => async (dispatch) => {
        dispatch({ type: getMoviesRequest });

        const url = `api/movies`;
        const response = await fetch(url);
        const movies = await response.json();

        dispatch({ type: getMoviesSuccess, movies });
    },

    addNewMovie: movie => async (dispatch) => {
        dispatch({ type: addNewMovieRequest });

        const url = `api/movies`;
        const response = await fetch(url,
            {
                headers: {
                    'Accept': "application/json",
                    'Content-Type': "application/json"
                },
                method: "POST",
                body: JSON.stringify(movie)
            });

        dispatch({ type: addNewMovieSuccess });

    },

    requestMovie: ({ id }) => async (dispatch) => {
        dispatch({ type: getMovieRequest });

        const url = `api/movies/${id}`;
        const response = await fetch(url);
        const movie = await response.json();
        var premiereDate = moment(movie.premiereDate);

        dispatch({ type: getMovieSuccess, movie: { ...movie, premiereDate } });
    },
};