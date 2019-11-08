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
    OPPONENT_ATTACK, GameStatus
} from 'utils/constants';

import {
    GAME_JOIN,
    GAME_OVER,
    GAME_START,
    USER_HIT,
    USER_LEFT,
    USER_TAKE_SHOOT,
    USER_CELL_HIT,
} from 'utils/constants';

import {Dispatch} from "types";
import {GameAction} from "types/game";

export const toggleManualSetup = (): GameAction => ({
    type: SHIP_SETUP_MANUAL_ACTIVE,
});

export const setupShipManual = (id: number): GameAction => ({
    type   : SETUP_SHIP_MANUAL,
    payload: id
});

export const selectShip = (id: string): GameAction => ({
    type   : SELECT_SHIP,
    payload: id
});

export const setupShipRandom = (): GameAction => ({
    type   : SETUP_SHIP_RANDOM,
});

export const userAttack = (hits: HitsModel[], ships: ShipsModel[]): GameAction => ({
    type   : USER_ATTACK,
    payload: {
        hits : hits,
        ships: ships
    }
});

export const opponentAttack = (hits: HitsModel[]): GameAction => ({
    type   : OPPONENT_ATTACK,
    payload: hits
});

export const startNewGame = (): GameAction => ({
    type: START_NEW_GAME,
});

export const updateGameState = (state: number): GameAction => ({
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
export const loadInitialEvents = (socket: any): (dispatch: Dispatch) => void => {
    return (dispatch: Dispatch) => {
        socket.on(GAME_START, (data: any) => {
            dispatch(updateGameState(GameStatus.STARTED));
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
            dispatch(updateGameState(GameStatus.END));
            dispatch(setWinner(data.winnerId));
        });

        socket.on(USER_LEFT, () => {
            dispatch(updateGameState(GameStatus.ABORTED));
        });

    }
};

export const joinGame = (socket: any, ships: ShipsModel[]): (dispatch: Dispatch) => void => {
    return (dispatch: Dispatch) => {
        socket.emit(GAME_JOIN, ships);
        dispatch(updateGameState(GameStatus.WAITING));
    }
};

export const shootAtCell = (socket: any, cell: string): () => void => {
    return () => {
        socket.emit(USER_CELL_HIT, cell);
    }
};


