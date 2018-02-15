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
            const hits = {...state.hits};
            const destroyOpponentShip = action.payload.destroyed || false;


            if (destroyOpponentShip) {
                hits.opponentBoard[destroyOpponentShip.startPos].destroyed = {
                    size: destroyOpponentShip.size,
                    orientation: destroyOpponentShip.orientation
                }
            }

            return {
                ...state,
                hits: {
                    ...state.hits,
                    opponentBoard: {
                        ...state.hits.opponentBoard,
                        [action.payload.key]: {
                            ...state.hits.opponentBoard[action.payload.key],
                            hit: action.payload.hit
                        }
                    }
                },
                currentTurn: action.payload.hit
            };

        case LIST_ACTIONS.SHOT_TAKE:
            const takeShots = {...state.hits};
            const destroyUserShip = action.payload.destroyed;

            takeShots.userBoard[action.payload.key] = {hit: action.payload.hit};

            if (destroyUserShip) {
                takeShots.userBoard[destroyUserShip.startPos].destroyed = true;
            }

            return {
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

        default:
          return state;
    }
};
