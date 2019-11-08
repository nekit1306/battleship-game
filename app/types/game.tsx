import {
    OPPONENT_ATTACK,
    SELECT_SHIP, SET_CURRENT_TURN,
    SET_WINNER, SETUP_SHIP_MANUAL,
    SETUP_SHIP_RANDOM,
    SHIP_SETUP_MANUAL_ACTIVE,
    START_NEW_GAME,
    UPDATE_GAME_STATE,
    USER_ATTACK
} from 'utils/constants'

export interface GameState {
    hits             : any[],
    enemyHits        : any[],
    ships            : any[],
    enemyShips       : any[],
    selectedShip     : any,
    gameState        : number,
    winnerId         : number,
    currentTurn      : boolean,
    manualSetupActive: boolean
}

export type GameAction =
    | { type: typeof SHIP_SETUP_MANUAL_ACTIVE }
    | { type: typeof SELECT_SHIP}
    | { type: typeof SETUP_SHIP_RANDOM}
    | { type: typeof SETUP_SHIP_MANUAL}
    | { type: typeof SET_WINNER}
    | { type: typeof OPPONENT_ATTACK}
    | { type: typeof USER_ATTACK}
    | { type: typeof UPDATE_GAME_STATE}
    | { type: typeof SET_CURRENT_TURN}
    | { type: typeof START_NEW_GAME}
