import  {
    SHIP_SETUP_MANUAL_ACTIVE
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

export interface IncrementEnthusiasm {
    type: constants.INCREMENT_ENTHUSIASM;
}

export interface DecrementEnthusiasm {
    type: constants.DECREMENT_ENTHUSIASM;
}

export type GameAction =
    | { type: string, payload: any }
    | { type: 'SELECT_SHIP'}
    | { type: 'SETUP_SHIP_MANUAL', id: number }
    | { type: 'SETUP_SHIP_RANDOM', ships: any[] }
    | { type: 'USER_ATTACK', hits: any[], ships: any[] }
    | { type: 'OPPONENT_ATTACK', hits: any[] }
    | { type: 'SET_WINNER', id: number }
    | { type: 'SET_CURRENT_TURN', turn: boolean }
    | { type: 'UPDATE_GAME_STATE', id: number }
    | { type: 'START_NEW_GAME' }
