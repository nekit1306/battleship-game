import { combineReducers } from 'redux';
import gameReducer from './game';
import socketReducer from './socket';

const rootReducer = combineReducers({
    gameReducer,
    socketReducer
});

export default rootReducer;
