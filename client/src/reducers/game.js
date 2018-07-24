import { GAME_ACTIONS } from '../consts/actionTypes';
import { LISTS } from '../consts/defaultState';
import { getRandomCoordinates, getShipPosition } from '../utils/helpers';


export default (state = LISTS, action) => {
    switch (action.type) {

        case GAME_ACTIONS.SHIP_PLACING_TOGGLE:
            return {
                ...state,
                shipPlacing: true,
                ships: [],
                cells: []
            };

        case GAME_ACTIONS.BATTLE_READY:
            return {
                ...state,
                readyForBattle: true,
                opponentWaiting: false,
                currentTurn: action.payload,
            };

        case GAME_ACTIONS.OPPONENT_WAITING:
            return { ...state, opponentWaiting: true };

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
              },
            };

        case GAME_ACTIONS.SHIP_SETUP_RANDOM:

            const randomCoords = getRandomCoordinates();

            return {
                ...state,
                ships: randomCoords.ships,
                cells: randomCoords.cells,
                shipPlacing: false
            };

        case GAME_ACTIONS.SHIP_SELECT:
            return {...state, selectedShip: action.payload};

        case GAME_ACTIONS.GAME_START:
            return {
                ...state,
                opponentWaiting: false,
                currentTurn: action.payload
            };

        case GAME_ACTIONS.GAME_OVER:
            return {
                ...state,
                gameOver: true,
                isWinner: action.payload
            };

        case GAME_ACTIONS.CELL_HIT:

            const hitsBoard = {
                ...state,
                hits: {
                    ...state.hits,
                    opponentBoard: {
                        ...state.hits.opponentBoard,
                        [action.payload.key]: {
                            ...state.hits.opponentBoard[action.payload.key],
                            hit: action.payload.hit,
                            destroyed: false
                        }
                    }
                },
                currentTurn: action.payload.hit
            };

            if (action.payload.destroyed) {
                hitsBoard.hits.opponentBoard[action.payload.startPos] = {
                    ...hitsBoard.hits.opponentBoard[action.payload.startPos],
                    destroyed: action.payload.destroyed
                }
            }

            return hitsBoard;


        case GAME_ACTIONS.SHOT_TAKE:

            const shotsBoard = {
                ...state,
                hits: {
                    ...state.hits,
                    userBoard: {
                        ...state.hits.userBoard,
                        [action.payload.key]: {
                            ...state.hits.userBoard[action.payload.key],
                            hit: action.payload.hit,
                            destroyed: false
                        }
                    }
                },
                currentTurn: !action.payload.hit
            };

            if (action.payload.destroyed) {
                shotsBoard.hits.userBoard[action.payload.startPos] = {
                    ...shotsBoard.hits.userBoard[action.payload.startPos],
                    destroyed: true
                }
            }

            return shotsBoard;

        default:
          return state;
    }
};
