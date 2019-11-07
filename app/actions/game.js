/**
 * Created by Kasutaja on 08.01.2018.
 */
import {
    SHIP_SETUP_MANUAL_ACTIVE,
    SELECT_SHIP,
    SETUP_SHIP_MANUAL,
    SETUP_SHIP_RANDOM,
    UPDATE_GAME_STATE,
    START_NEW_GAME,
    SET_WINNER,
    SET_CURRENT_TURN,
    USER_ATTACK,
    OPPONENT_ATTACK
} from './types';

import {
    GAME_JOIN,
    GAME_OVER,
    GAME_START,
    USER_HIT,
    USER_LEFT,
    USER_TAKE_SHOOT,
    USER_CELL_HIT,
    GAME_START_STATE,
    GAME_ABORTED_STATE,
    GAME_WAITING_STATE,
    GAME_END_STATE
} from '../utils/constants';
import type {Dispatch} from "../types";
import type {GameAction, Hit, Ship} from "../types/game";


export const toggleManualSetup = (): GameAction => ({
    type: SHIP_SETUP_MANUAL_ACTIVE,
});

export const selectShip = (id: string): GameAction => ({
    type   : SELECT_SHIP,
    payload: id
});

export const setupShipManual = (id: number): GameAction => ({
    type   : SETUP_SHIP_MANUAL,
    payload: id
});

export const setupShipRandom = (ships: Ship[]): GameAction => ({
    type   : SETUP_SHIP_RANDOM,
    payload: ships
});

export const userAttack = (hits: Hit[], ships: Ship[]): GameAction => ({
    type   : USER_ATTACK,
    payload: {
        hits : hits,
        ships: ships
    }
});

export const opponentAttack = (hits: Hit[]): GameAction => ({
    type   : OPPONENT_ATTACK,
    payload: hits
});

export const startNewGame = (): GameAction => ({
    type: START_NEW_GAME,
});

export const updateGameState = (state: GameStatusState): GameAction => ({
    type   : UPDATE_GAME_STATE,
    payload: state
});

export const setWinner = (winnerId: number): GameAction => ({
    type   : SET_WINNER,
    payload: winnerId
});

export const setCurrentTurn = (turn: boolean): GameAction => ({
    type   : SET_CURRENT_TURN,
    payload: turn
});


// Socket events
export const loadInitialEvents = (socket: any): GameAction => {
    return (dispatch: Dispatch) => {
        socket.on(GAME_START, (data: any) => {
            dispatch(updateGameState(GAME_START_STATE));
            dispatch(setCurrentTurn(data.currentTurn));
        });

        socket.on(USER_HIT, (data: any) => {
            const { hits, ships } = data.response;

            dispatch(userAttack(hits, ships));
            dispatch(setCurrentTurn(data.currentTurn));
        });

        socket.on(USER_TAKE_SHOOT, (data: any) => {
            dispatch(opponentAttack(data.response));
            dispatch(setCurrentTurn(data.currentTurn));
        });

        socket.on(GAME_OVER, (data: any) => {
            dispatch(updateGameState(GAME_END_STATE));
            dispatch(setWinner(data.winnerId));
        });

        socket.on(USER_LEFT, () => {
            dispatch(updateGameState(GAME_ABORTED_STATE));
        });

    }
};

export const joinGame = (socket: any, ships: Ship[]): GameAction => {
    return (dispatch) => {
        socket.emit(GAME_JOIN, ships);
        dispatch(updateGameState(GAME_WAITING_STATE));
    }
};

export const shootAtCell = (socket: any, cell: string): GameAction => {
    return () => {
        socket.emit(USER_CELL_HIT, cell);
    }
};


