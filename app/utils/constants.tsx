/**
 * Created by Kasutaja on 08.01.2018.
 */

// Game Actions
export const SHIP_SETUP_MANUAL_ACTIVE = 'SHIP_SETUP_MANUAL_ACTIVE';
export const SELECT_SHIP              = 'SELECT_SHIP';
export const SETUP_SHIP_MANUAL        = 'SETUP_SHIP_MANUAL';
export const SETUP_SHIP_RANDOM        = 'SETUP_SHIP_RANDOM';
export const SET_WINNER               = 'SET_WINNER';
export const OPPONENT_ATTACK          = 'OPPONENT_ATTACK ';
export const USER_ATTACK              = 'USER_ATTACK ';
export const UPDATE_GAME_STATE        = 'UPDATE_GAME_STATE';
export const SET_CURRENT_TURN         = 'SET_CURRENT_TURN';
export const START_NEW_GAME           = 'START_NEW_GAME';

// Socket Actions
export const UPDATE_SOCKET = 'UPDATE_SOCKET';

// Socket Events
export const GAME_START      = 'game_start';
export const GAME_JOIN       = 'game_join';
export const GAME_OVER       = 'game_over';
export const USER_LEFT       = 'user_left';
export const USER_HIT        = 'user_hit';
export const USER_TAKE_SHOOT = 'user_take_shoot';
export const USER_CELL_HIT   = 'user_cell_hit';

// Game Enums
export enum GameStatus {
    DEFAULT = 0,
    WAITING = 1,
    STARTED = 2,
    END     = 3,
    ABORTED = 4,
}

export enum ShipStatus {
    MISSED    = 0,
    DAMAGED   = 1,
    DESTROYED = 2
}
