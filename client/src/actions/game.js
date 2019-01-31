/**
 * Created by Kasutaja on 08.01.2018.
 */

import {
    SHIP_SETUP_MANUAL_ACTIVE,
    BATTLE_READY,
    CELL_HIT,
    GAME_RESET,
    OPPONENT_WAITING,
    SHIP_SELECT,
    SHIP_SETUP_MANUAL,
    SHIP_SETUP_RANDOM,
    SHOT_TAKE,
} from './types';

import {GAME_JOIN, GAME_OVER, GAME_START, USER_HIT, USER_LEFT} from '../utils/constants';


export const toggleManualSetup = () => ({
    type: SHIP_SETUP_MANUAL_ACTIVE,
});

export const waitForOpponent = () => ({
    type: OPPONENT_WAITING,
});

export const readyForBattle = currentTurn => ({
    type: BATTLE_START,
    payload: currentTurn
});

export const selectShip = ship => ({
    type: SHIP_SELECT,
    payload: ship
});

export const setupShipManual = ship => ({
    type: SHIP_SETUP_MANUAL,
    payload: ship
});

export const setupShipRandom = ships => ({
    type: SHIP_SETUP_RANDOM,
});

export const hitCell = cell => ({
    type: SHIP_HIT,
    payload: cell
});

export const takeShot = cell => ({
    type: SHOT_TAKE,
    payload: cell
});

export const gameOver = winner => ({
    type: GAME_OVER,
    payload: winner
});

export const gameReset = () => ({
    type: GAME_RESET,
});


// Socket events

export const loadInitialEvents = socket => {
    return (dispatch) => {
        socket.on(GAME_START, currentTurn => {
            dispatch(readyForBattle(currentTurn));
        });

        socket.on(USER_HIT, cell => {
            dispatch(hitCell(cell));
        });

        socket.on(USER_SHOOT_TAKE, cell => {
            dispatch(takeShot(cell));
        });

        socket.on(USER_LEFT, () => {
            // some dispatch
        });

        socket.on(GAME_OVER, winner => {
            dispatch(gameOver(winner));
        });

    }
};

export const joinGame = (socket, board) => {
    return (dispatch) => {
        socket.emit(GAME_JOIN, board);
        dispatch(waitForOpponent());
    }
};

export const shootAtCell = (socket, cell) => {
    return () => {
        socket.emit(SHOOT, cell);
    }
};


