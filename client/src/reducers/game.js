import { GAME_ACTIONS } from '../consts/actionTypes';
import { INITIAL_GAME_STATE, USER_BOARD_INITIAL_STATE } from '../consts/defaultState';
import { getRandomCoordinates, getShipPosition } from '../utils/helpers';


function userBoardReducer(state = {}, action) {
    switch (action.type) {
        case GAME_ACTIONS.SHIP_CLEAR:
            return {...state, ships: [], cells: []};
        case GAME_ACTIONS.SHIP_SETUP_MANUAL:
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
        case GAME_ACTIONS.SHIP_SETUP_RANDOM:

            const randomCoords = getRandomCoordinates();

            return {
                ...state,
                ships: randomCoords.ships,
                cells: randomCoords.cells,
            };
        case GAME_ACTIONS.SHOT_TAKE:

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
}

function opponentBoardReducer(state = {}, action) {
    switch (action.type) {
        case GAME_ACTIONS.CELL_HIT:

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
}


export default (state = INITIAL_GAME_STATE, action) => {
    switch (action.type) {
        case GAME_ACTIONS.SHIP_SETUP_RANDOM:
        case GAME_ACTIONS.SHIP_SETUP_MANUAL:
            return {...state, userBoard: userBoardReducer(state.userBoard, action)};
        case GAME_ACTIONS.SHIP_CLEAR:
            return {...state, userBoard: USER_BOARD_INITIAL_STATE};
        case GAME_ACTIONS.OPPONENT_WAITING:
            return { ...state, opponentWaiting: true };
        case GAME_ACTIONS.SHIP_SELECT:
            return {...state, selectedShip: action.payload};
        case GAME_ACTIONS.GAME_START:
            return {...state, opponentWaiting: false, currentTurn: action.payload};
        case GAME_ACTIONS.GAME_OVER:
            return {...state, gameOver: true, isWinner: action.payload};
        case GAME_ACTIONS.SHOT_TAKE:
            return {
                ...state,
                userBoard: userBoardReducer(state.userBoard, action),
                currentTurn: !action.payload.hit
            };
        case GAME_ACTIONS.CELL_HIT:
            return {
                ...state,
                opponentBoard: opponentBoardReducer(state.userBoard, action),
                currentTurn: action.payload.hit
            };
        case GAME_ACTIONS.BATTLE_READY:
            return {
                ...state,
                readyForBattle: true,
                opponentWaiting: false,
                currentTurn: action.payload
            };
        default:
          return state;
    }
}
