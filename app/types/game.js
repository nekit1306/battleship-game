// @flow

import {
    GAME_ABORTED_STATE,
    GAME_END_STATE,
    GAME_START_STATE,
    GAME_WAITING_STATE
} from "../utils/constants";

export type Id = number;

export type Text = string;

export type Boolean = boolean;

export type GameStatusState = GAME_START_STATE | GAME_WAITING_STATE | GAME_ABORTED_STATE | GAME_END_STATE

export type Hit = {
    +id: Id,
    +status: Text,
};

export type Ship = {
    +id: Id,
    +position: Array<number>,
    +size: number,
    +orientation: string
}

export type DestroyedShip = {
    +id: Id,
    +size: number,
    +orientation: string
}

export type SelectedShip = {
    +id: Id,
    +size: number,
    +orientation: string
}

export type Game = {
    +hits             : Hit[],
    +enemyHits        : Hit[],
    +ships            : Ship[],
    +enemyShips       : DestroyedShip[],
    +selectedShip     : SelectedShip,
    +gameState        : Id,
    +winnerId         : Id,
    +currentTurn      : Boolean,
    +manualSetupActive: Boolean
}

export type GameState = {
    game: Game
};

export type GameAction =
    | { type: 'SHIP_SETUP_MANUAL_ACTIVE' }
    | { type: 'SELECT_SHIP', +id: Id }
    | { type: 'SETUP_SHIP_MANUAL', +id: Id }
    | { type: 'SETUP_SHIP_RANDOM', +ships: Ship[] }
    | { type: 'USER_ATTACK', +hits: Hit[], +ships: Ship[] }
    | { type: 'OPPONENT_ATTACK', +hits: Hit[] }
    | { type: 'SET_WINNER', +id: Id }
    | { type: 'SET_CURRENT_TURN', +turn: Boolean }
    | { type: 'UPDATE_GAME_STATE', +id: Id }
    | { type: 'START_NEW_GAME' };