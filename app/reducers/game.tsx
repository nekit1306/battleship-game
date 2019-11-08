import {
    SHIP_SETUP_MANUAL_ACTIVE,
    SETUP_SHIP_MANUAL,
    SETUP_SHIP_RANDOM,
    OPPONENT_ATTACK,
    START_NEW_GAME,
    SET_CURRENT_TURN,
    SELECT_SHIP,
    USER_ATTACK,
    UPDATE_GAME_STATE,
    SET_WINNER
} from 'utils/constants';

import { GameStatus } from 'utils/constants';
import { GameState, GameAction } from "types/game";

const INITIAL_STATE: GameState = {
    hits             : [],
    enemyHits        : [],
    ships            : [],
    enemyShips       : [],
    selectedShip     : {},
    gameState        : GameStatus.DEFAULT,
    winnerId         : null,
    currentTurn      : null,
    manualSetupActive: false
};

const gameReducer = (state = INITIAL_STATE, action: GameAction): GameState => {
    switch (action.type) {
        case SHIP_SETUP_MANUAL_ACTIVE:
            return {
                ...state,
                ships: [],
                manualSetupActive: !state.manualSetupActive
            };
        case SELECT_SHIP:
            return {
                ...state,
                selectedShip: action.payload
            };
        case SETUP_SHIP_MANUAL:
            return {
                ...state,
                ships: []
            };
        case SETUP_SHIP_RANDOM:
            return {
                ...state,
                ships: action.payload,
                manualSetupActive: false
            };
        case SET_CURRENT_TURN:
            return {
                ...state,
               currentTurn: action.payload
            };
        case OPPONENT_ATTACK:
            return {
                ...state,
                hits: action.payload,
            };
        case USER_ATTACK:
            return {
                ...state,
                enemyHits : action.payload.hits,
                enemyShips: action.payload.ships
            };
        case UPDATE_GAME_STATE:
            return {
                ...state,
                gameState: action.payload
            };
        case SET_WINNER:
            return {
                ...state,
                winnerId: action.payload
            };
        case START_NEW_GAME:
            return {
                ...state,
                ...INITIAL_STATE
            };
        default:
          return state;
    }
};

export default gameReducer;
