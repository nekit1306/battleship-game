import React from 'react';
import { Route } from 'react-router-dom';
import Header from './components/header';
import Home from './containers/home';

const App = () => (
  <div>
    <Header />
    <Route exact path="/" component={Home} />
  </div>
);

export default App;
