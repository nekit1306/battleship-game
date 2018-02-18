import { LIST_ACTIONS } from '../consts/actionTypes';
import { LISTS } from '../consts/defaultState';
import { getRandomCoordinates, getShipPosition } from '../utils/helpers'


export default (state = LISTS, action) => {
    switch (action.type) {

        case LIST_ACTIONS.SHIP_PLACING_TOGGLE:
            return { ...state, shipPlacing: !state.shipPlacing};

        case LIST_ACTIONS.BATTLE_READY:
            return {
                ...state,
                readyForBattle: true,
                opponentWaiting: false,
                currentTurn: action.payload,
            };

        case LIST_ACTIONS.OPPONENT_WAITING:
            return { ...state, opponentWaiting: true };

        case LIST_ACTIONS.SHIP_SETUP_MANUAL:
            const shipToAdd = action.payload;

            return {
              ...state,
              ships: {
                  ...state.ships,
                  [shipToAdd.id]: getShipPosition(shipToAdd.x, shipToAdd.y, shipToAdd.size)
              },
              cells: {
                  ...state.cells,
                  [shipToAdd.key]: {
                      ...state.cells[shipToAdd.key],
                      id: shipToAdd.id
                  }
              },
            };

        case LIST_ACTIONS.SHIP_SETUP_RANDOM:

            const randomCoordinates = getRandomCoordinates();

            return {
                ...state,
                ships: randomCoordinates.ships,
                cells: randomCoordinates.cells
            };

        case LIST_ACTIONS.SHIP_SELECT:
            return {...state, selectedShip: action.payload};

        case LIST_ACTIONS.GAME_START:
            return {
                ...state,
                opponentWaiting: false,
                currentTurn: action.payload
            };

        case LIST_ACTIONS.CELL_HIT:

            const hitBoard = {
                ...state,
                hits: {
                    ...state.hits,
                    opponentBoard: {
                        ...state.hits.opponentBoard,
                        [action.payload.key]: {
                            hit: action.payload.hit
                        }
                    }
                },
                currentTurn: action.payload.hit
            };

            if (action.payload.destroyed) {
                hitBoard.hits.opponentBoard[action.payload.parent] = {
                    ...hitBoard.hits.opponentBoard[action.payload.parent],
                    destroyed: action.payload.destroyed
                }
            }

            return hitBoard;

        case LIST_ACTIONS.SHOT_TAKE:

            const takeShoot = {
                ...state,
                hits: {
                    ...state.hits,
                    userBoard: {
                        ...state.hits.userBoard,
                        [action.payload.key]: {
                            ...state.hits.userBoard[action.payload.key],
                            hit: action.payload.hit
                        }
                    }
                },
                currentTurn: !action.payload.hit
            };

            if (action.payload.destroyed) {
                takeShoot.hits.userBoard[action.payload.parent] = {
                    ...takeShoot.hits.userBoard[action.payload.parent],
                    destroyed: true
                }
            }

            return takeShoot;

        default:
          return state;
    }
};
