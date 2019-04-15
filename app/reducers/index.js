import { combineReducers } from 'redux';
import game from './game';
import socketReducer from './socket';

const rootReducer = combineReducers({
    game,
    socketReducer
});

export default rootReducer;
