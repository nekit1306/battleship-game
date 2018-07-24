import { combineReducers } from 'redux';
import game from './game';
import socket from './socket';

const rootReducer = combineReducers({
  game,
  socket
});

export default rootReducer;
