/**
 * Created by Kasutaja on 08.01.2018.
 */

import {
    SHIP_SETUP_MANUAL_ACTIVE,
    BATTLE_READY,
    CELL_HIT,
    GAME_RESET,
    OPPONENT_WAITING,
    SELECT_SHIP,
    SETUP_SHIP_MANUAL,
    SETUP_SHIP_RANDOM,
    SETUP_SHIP_MANUAL_ACTIVE,
    SHOT_TAKE,
} from './types';

import {GAME_JOIN, GAME_OVER, GAME_START, USER_HIT, USER_LEFT, USER_TAKE_SHOOT} from '../utils/constants';


export const toggleManualSetup = () => ({
    type: SHIP_SETUP_MANUAL_ACTIVE,
});

export const selectShip = ship => ({
    type: SELECT_SHIP,
    payload: ship
});

export const setupShipManual = ship => ({
    type: SETUP_SHIP_MANUAL,
    payload: ship
});

export const setupShipRandom = ships => ({
    type: SETUP_SHIP_RANDOm,
});

export const userAttack = cell => ({
    type: USER_ATTACK,
    payload: cell
});

export const opponentAttack = cell => ({
    type: OPPONENT_ATTACK,
    payload: cell
});

export const startNewGame = () => ({
    type: SET_GAME_RESET,
});

export const updateGameState = state => ({
    type: UPDATE_GAME_STATE,
    payload: state
});

export const setWinner = winner => ({

});

export const setCurrentTurn = turn => ({

});


// Socket events

export const loadInitialEvents = socket => {
    return (dispatch) => {
        socket.on(GAME_START, (state, currentTurn) => {
            dispatch(updateGameState(state));
            dispatch(setCurrentTurn(currentTurn));
        });

        socket.on(USER_HIT, cell => {
            dispatch(hitCell(cell));
        });

        socket.on(USER_TAKE_SHOOT, cell => {
            dispatch(takeShot(cell));
        });

        socket.on(USER_LEFT, (state) => {
            dispatch(updateGameState(state));
        });

        socket.on(GAME_OVER, (state, winner) => {
            dispatch(updateGameState(state));
            dispatch(setWinner(winner));
        });

    }
};

export const joinGame = (socket, board, state) => {
    return (dispatch) => {
        socket.emit(GAME_JOIN, board);
        dispatch(updateGameState(state));
    }
};

export const shootAtCell = (socket, cell) => {
    return () => {
        socket.emit(SHOOT, cell);
    }
};


