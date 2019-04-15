import {
    SHIP_SETUP_MANUAL_ACTIVE,
    SHIP_SETUP_MANUAL,
    SETUP_SHIP_MANUAL,
    SETUP_SHIP_RANDOM,
    SHOT_TAKE,
    OPPONENT_ATTACK,
    OPPONENT_WAITING,
    SHIP_SELECT,
    GAME_START,
    GAME_OVER,
    GAME_RESET,
    START_GAME,
    ABORT_GAME,
    BATTLE_READY,
    SELECT_SHIP,
    WAIT_FOR_OPPONENT,
    USER_ATTACK,
    END_GAME,
    REPEAT_GAME
} from '../actions/types';

import {
    GAME_ABORTED_STATE,
    GAME_DEFAULT_STATE,
    GAME_OVER_STATE,
    GAME_START_STATE,
    GAME_WAITING_STATE
} from '../utils/constants';
import socketReducer from './socket';


const INITIAL_STATE  = {
    userBoard        : {},
    opponentBoard    : {},
    ships            : [],
    selectedShip     : {},
    gameState        : GAME_DEFAULT_STATE,
    winnerId         : null,
    currentTurn      : null,
    manualSetupActive: false
};

const updateBoardPoints = (state = {}, action) => {
    switch (action.type) {
        case USER_ATTACK:
        case OPPONENT_ATTACK:
            return {
                ...state,
                hitPoints : action.payload.hit_points,
                sunkPoints: action.payload.sunk_points
            };
        default:
            return state;
    }
};

const updateShipCoordinates = (state = {}, action) => {
    switch (action.type) {
        case SETUP_SHIP_RANDOM:
            return [...action.payload.ships];
        case SETUP_SHIP_MANUAL:
            return [...state, action.payload];
        default:
            return state;
    }
};

const gameReducer = (state = INITIAL_STATE, action) => {
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
        case WAIT_FOR_OPPONENT:
            return {
                ...state,
                gameState: GAME_WAITING_STATE,
            };
        case SETUP_SHIP_MANUAL:
            return {
                ...state,
                ships: updateShipCoordinates(state.ships, action)
            };
        case SETUP_SHIP_RANDOM:
            return {
                ...state,
                ships: updateShipCoordinates(state.ships, action),
                manualSetupActive: false
            };
        case OPPONENT_ATTACK:
            return {
                ...state,
                userBoard  : updateBoardPoints(state.userBoard, action),
                currentTurn: true
            };
        case USER_ATTACK:
            return {
                ...state,
                opponentBoard: updateBoardPoints(state.opponentBoard, action),
                currentTurn  : false
            };
        case START_GAME:
            return {
                ...state,
                gameState  : GAME_START_STATE,
                currentTurn: action.payload
            };
        case ABORT_GAME:
            return {
                gameState: GAME_ABORTED_STATE,
            };
        case END_GAME:
            return {
                ...state,
                gameState: GAME_OVER_STATE,
                isWinner : action.payload
            };
        case REPEAT_GAME:
            return {
                ...state,
                ...INITIAL_STATE
            };
        default:
          return state;
    }
};

export default gameReducer;
