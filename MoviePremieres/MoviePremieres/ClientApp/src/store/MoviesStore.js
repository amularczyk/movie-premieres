const requestMoviesStoreType = 'REQUEST_MOVIES';
const receiveMoviesStoreType = 'RECEIVE_MOVIES';
const addNewMovieRequest = 'ADD_NEW_MOVIE_REQUEST';
const addNewMovieSuccess = 'ADD_NEW_MOVIE_SUCCESS';
const initialState = { movies: [], isLoading: false };

export const actionCreators = {
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
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(movie)
            });

        dispatch({ type: addNewMovieSuccess });
    
    }
};

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
