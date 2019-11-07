import { combineReducers } from 'redux';
import gameReducer from './game';
import socketReducer from './socket';

const rootReducer = combineReducers({
    game  : gameReducer,
    socket: socketReducer
});

export default rootReducer;
