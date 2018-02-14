import React from 'react';
import { Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './containers/Home';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

const App = () => (
  <div>
    <Header />
    <Route exact path="/" component={Home} />
  </div>
);

export default App;
