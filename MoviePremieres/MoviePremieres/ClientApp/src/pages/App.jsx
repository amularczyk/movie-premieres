import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Layout from '../components/Layout';
import Movies from './Movies';
import AddNewMovie from './AddNewMovie';
import Movie from './Movie';

class App extends Component {
  render() {
    return (
      <Layout>
        <Route exact path="/" component={Movies} />
        <Route exact path="/add-movie" component={AddNewMovie} />
        <Route exact path="/movie/:id" component={Movie} />
      </Layout>
    );
  }
}

export default App;
