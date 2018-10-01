import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Movies from './components/Movies';

export default () => (
  <Layout>
    <Route exact path='/' component={Movies} />
  </Layout>
);
