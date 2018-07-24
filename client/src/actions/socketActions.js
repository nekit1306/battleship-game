/**
 * Created by Kasutaja on 17.04.2018.
 */
import {SOCKET_ACTIONS, SOCKET_EVENTS} from "../consts/actionTypes";

import { readyForBattle, waitForOpponent, hitCell, takeShot, gameOver } from "./gameActions"

// Socket actions

export const updateSocket = socket => ({
    type: SOCKET_ACTIONS.SOCKET_UPDATE,
    payload: socket
});

// Socket events

export const loadInitialSockets = socket => {
    return (dispatch) => {
        socket.on(SOCKET_EVENTS.GAME_START, currentTurn => {
            dispatch(readyForBattle(currentTurn));
        });

        socket.on(SOCKET_EVENTS.HIT, cell => {
            dispatch(hitCell(cell));
        });

        socket.on(SOCKET_EVENTS.SHOT_TAKE, cell => {
            dispatch(takeShot(cell));
        });

        socket.on(SOCKET_EVENTS.USER_LEFT, () => {
            // some dispatch
        });

        socket.on(SOCKET_EVENTS.GAME_OVER, winner => {
            dispatch(gameOver(winner));
        });

    }
};

export const joinGame = (socket, board) => {
    return (dispatch) => {
        socket.emit(SOCKET_EVENTS.GAME_JOIN, board);
        dispatch(waitForOpponent());
    }
};

export const shootAtCell = (socket, cell) => {
    return (dispatch) => {
        socket.emit(SOCKET_EVENTS.SHOOT, cell);
    }
};
