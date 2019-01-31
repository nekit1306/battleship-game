import {
    SHIP_SETUP_MANUAL_ACTIVE,
    SHIP_SETUP_MANUAL,
    SHIP_SETUP_RANDOM,
    SHOT_TAKE,
    CELL_HIT,
    OPPONENT_WAITING,
    SHIP_SELECT,
    GAME_START,
    GAME_OVER,
    GAME_RESET,
    BATTLE_READY
} from '../actions/types';

import {GAME_DEFAULT_STATE, GAME_OVER_STATE, GAME_START_STATE, GAME_WAITING_STATE} from '../utils/constants';


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
        case CELL_HIT:
        case SHOT_TAKE:
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
        case SHIP_SETUP_RANDOM:
            return [...action.payload.ships];
        case SHIP_SETUP_MANUAL:
            return [...state, action.payload];
        default:
            return state;
    }
};

export const gameReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SHIP_SETUP_MANUAL_ACTIVE:
            return {
                ...state,
                ships: [],
                manualSetupActive: !state.manualSetupActive
            };
        case SHIP_SELECT:
            return {
                ...state,
                selectedShip: action.payload
            };
        case OPPONENT_WAITING:
            return {
                ...state,
                gameState: GAME_WAITING_STATE,
            };
        case SHIP_SETUP_MANUAL:
            return {
                ...state,
                ships: updateShipCoordinates(state.ships, action)
            };
        case SHIP_SETUP_RANDOM:
            return {
                ...state,
                ships: updateShipCoordinates(state.ships, action),
                manualSetupActive: false
            };
        case SHOT_TAKE:
            return {
                ...state,
                userBoard  : updateBoardPoints(state.userBoard, action),
                currentTurn: true
            };
        case CELL_HIT:
            return {
                ...state,
                opponentBoard: updateBoardPoints(state.opponentBoard, action),
                currentTurn  : false
            };
        case GAME_OVER:
            return {
                ...state,
                gameState: GAME_OVER_STATE,
                isWinner : action.payload
            };
        case GAME_START:
            return {
                ...state,
                gameState  : GAME_START_STATE,
                currentTurn: action.payload
            };
        case GAME_RESET:
            return {
                ...state,
                ...INITIAL_STATE
            };
        default:
          return state;
    }
};
