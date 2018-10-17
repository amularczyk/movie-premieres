import {
  applyMiddleware, combineReducers, compose, createStore,
} from 'redux';
import thunk from 'redux-thunk';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import * as moviesReducer from './reducers/moviesReducer';
import * as movieReducer from './reducers/movieReducer';

export default function configureStore(history, initialState) {
  const reducers = {
    moviesStore: moviesReducer.reducer,
    movieStore: movieReducer.reducer,
  };

  const middleware = [
    thunk,
    routerMiddleware(history),
  ];

  // In development, use the browser's Redux dev tools extension if installed
  const enhancers = [];
  const isDevelopment = process.env.NODE_ENV === 'development';
  if (isDevelopment && typeof window !== 'undefined' && window.devToolsExtension) {
    enhancers.push(window.devToolsExtension());
  }

  const rootReducer = combineReducers({
    ...reducers,
    routing: routerReducer,
  });

  return createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middleware), ...enhancers),
  );
}
