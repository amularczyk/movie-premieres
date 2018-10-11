﻿import React, { Component } from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Movies from './components/Movies';
import AddNewMovie from './components/AddNewMovie';
import Movie from './components/Movie';

class App extends Component {
    render() {
        return (
            <Layout>
                <Route exact path='/' component={Movies} />
                <Route exact path='/add-movie' component={AddNewMovie} />
                <Route exact path='/movie/:id' component={Movie} />
            </Layout>
        );
    }
}

export default App;