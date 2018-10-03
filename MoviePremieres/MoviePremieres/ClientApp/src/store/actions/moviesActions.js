import {
    requestMoviesStoreType,
    receiveMoviesStoreType,
    addNewMovieRequest,
    addNewMovieSuccess
} from "../constants/moviesConstants";

export const moviesActions = {
    requestMovies: () => async (dispatch) => {
        dispatch({ type: requestMoviesStoreType });

        const url = `api/movies`;
        const response = await fetch(url);
        const movies = await response.json();

        dispatch({ type: receiveMoviesStoreType, movies });
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

    }
};