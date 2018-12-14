import { getRandomCoordinates, getShipPosition } from '../utils/helpers';
import {
    SHIP_CLEAR,
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
} from '../actions/gameActions'

const gameInitialState = {
    userBoard      : {
        hitPoints: [],
        destroyed: []
    },
    opponentBoard  : {
        hitPoints: [],
        destroyed: []
    },
    ships          : [],
    selectedShip   : {},
    opponentWaiting: false,
    readyForBattle : false,
    gameOver       : false,
    isWinner       : null,
    currentTurn    : null
};


const userBoardReducer = (state = {}, action) => {
    switch (action.type) {
        case SHIP_CLEAR:
            return {...state, ships: [], cells: []};
        case SHIP_SETUP_MANUAL:
            return {
                ...state,
                ships: {
                    ...state.ships,
                    [action.payload.id]: getShipPosition(shipToAdd.x, shipToAdd.y, shipToAdd.size)
                },
                cells: {
                    ...state.cells,
                    [action.payload.key]: {
                        ...state.cells[action.payload.key],
                        id: action.payload.id
                    }
                }
            };
        case SHIP_SETUP_RANDOM:

            const randomCoords = getRandomCoordinates();

            return {
                ...state,
                ships: randomCoords.ships,
            };
        case SHOT_TAKE:

            const checkForDestroyed = (state = {}, destroyedArray) => {
                if (Object.keys(destroyedArray).length > 0) {
                    return state.concat(destroyedArray);
                } else {
                    return state;
                }
            };

            return {
                ...state,
                hit_points: {
                    ...state.hits,
                    [action.payload.key]: {
                        ...state.hits[action.payload.key], ...action.payload.hit
                    }
                },
                destroyed: checkForDestroyed(state.destroyed, action.payload.destroyed)
            };
        default:
            return state;
    }
};

const opponentBoardReducer = (state = {}, action)=> {
    switch (action.type) {
        case CELL_HIT:
            const checkForDestroyed = (state = {}, destroyedArray) => {
                if (Object.keys(destroyedArray).length > 0) {
                    return state.concat(destroyedArray);
                } else {
                    return state;
                }
            };

            return {
                ...state,
                hit_points: {
                    ...state.hits,
                    [action.payload.key]: {
                        ...state.hits[action.payload.key], ...action.payload.hit
                    }
                },
                destroyed: checkForDestroyed(state.destroyed, action.payload.destroyed)
            };
        default:
            return state;
    }
};


const gameReducer = (state = gameInitialState, action) => {
    switch (action.type) {
        case SHIP_SETUP_RANDOM:
        case SHIP_SETUP_MANUAL:
            return {...state, userBoard: userBoardReducer(state.userBoard, action)};
        case SHIP_CLEAR:
            return {...state, userBoard: USER_BOARD_INITIAL_STATE};
        case OPPONENT_WAITING:
            return { ...state, opponentWaiting: true };
        case SHIP_SELECT:
            return {...state, selectedShip: action.payload};
        case GAME_START:
            return {...state, opponentWaiting: false, currentTurn: action.payload};
        case GAME_OVER:
            return {...state, gameOver: true, isWinner: action.payload};
        case GAME_RESET:
            return{...state, ...gameInitialState};
        case SHOT_TAKE:
            return {
                ...state,
                userBoard: userBoardReducer(state.userBoard, action),
                currentTurn: !action.payload.hit
            };
        case CELL_HIT:
            return {
                ...state,
                opponentBoard: opponentBoardReducer(state.userBoard, action),
                currentTurn: action.payload.hit
            };
        case BATTLE_READY:
            return {
                ...state,
                readyForBattle: true,
                opponentWaiting: false,
                currentTurn: action.payload
            };
        default:
          return state;
    }
};

export default gameReducer;
