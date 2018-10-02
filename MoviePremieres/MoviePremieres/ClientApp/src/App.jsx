import React, { Component } from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Movies from './components/Movies';
import AddNewMovie from './components/AddNewMovie';

class App extends Component {
    render() {
        return (
            <Layout>
                <Route exact path='/' component={Movies} />
                <Route exact path='/add-movie' component={AddNewMovie} />
            </Layout>
        );
    }
}

export default App;