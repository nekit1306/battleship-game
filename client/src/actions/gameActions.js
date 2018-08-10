import { GAME_ACTIONS } from '../consts/actionTypes';


export const toggleShipPlacing = () => ({
    type: GAME_ACTIONS.SHIP_CLEAR,
});

export const waitForOpponent = () => ({
    type: GAME_ACTIONS.OPPONENT_WAITING,
});

export const readyForBattle = currentTurn => ({
    type: GAME_ACTIONS.BATTLE_READY,
    payload: currentTurn
});

export const selectShip = ship => ({
    type: GAME_ACTIONS.SHIP_SELECT,
    payload: ship
});

export const setupShipManual = ship => ({
    type: GAME_ACTIONS.SHIP_SETUP_MANUAL,
    payload: ship
});

export const setupShipRandom = () => ({
    type: GAME_ACTIONS.SHIP_SETUP_RANDOM,
});


export const hitCell = cell => ({
    type: GAME_ACTIONS.CELL_HIT,
    payload: cell
});

export const takeShot = cell => ({
    type: GAME_ACTIONS.SHOT_TAKE,
    payload: cell
});

export const gameOver = winner => ({
    type: GAME_ACTIONS.GAME_OVER,
    payload: winner
});

export const gameReset = () => ({
    type: GAME_ACTIONS.GAME_RESET,
});

