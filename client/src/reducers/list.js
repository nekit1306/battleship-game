import { LIST_ACTIONS } from '../consts/action_types';
import { LISTS } from '../consts/default_state';

function getShipPosition (x, y, size, orientation) {
    const position = [];
    for (let i = 0; i < size; i++) {
        const xCoord = orientation === 0 ? x + i : x;
        const yCoord = orientation === 1 ? y + i : y;
        position.push(`${xCoord}${yCoord}`);
    }
    return position;
}

function getRandomCoordinates () {
    const shipsSize = [4, 3, 2, 1];
    let corners = [];

    const ships = {};
    const cells = {};

    let id = 0;

    shipsSize.forEach((size, i) => {
        for(let a = 0; a <= i; a++) {

            let x = null;
            let y = null;
            let xCoord = null;
            let yCoord = null;

            let endPosition = null;
            let orientation = null;

            do {
                x = Math.floor(Math.random() * 10);
                y = Math.floor(Math.random() * 10);
                orientation = Math.floor(Math.random() * 2);

                xCoord = orientation === 0 ? x + size : x;
                yCoord = orientation === 1 ? y + size : y;

                endPosition = orientation === 0 ? x + size : y + size;

            } while ((endPosition) > 9 || corners.indexOf(`${x}${y}`) !== -1 || corners.indexOf(`${xCoord}${yCoord}`) !== -1);

            corners = corners.concat(calculateCorners(x, y, size, orientation));

            ships[id] = {
                pos        : getShipPosition(x, y, size, orientation),
                size       : size,
                startPos   : `${x}${y}`,
                orientation: orientation
            };

            cells[`${x}${y}`] = {
                id: id
            };

            id++;
        }
    });

    return {ships: ships, cells: cells};
}


function calculateCorners (x, y, size, orientation) {

    const corners = [];

    for(let i = -1; i < size + 1; i++) {
        for(let a = -1; a < 2; a++) {
            const xCoord = orientation === 0 ? x + i : x + a;
            const yCoord = orientation === 0 ? y + a : y + i;
            if ( xCoord >= 0 && xCoord < 10 && yCoord >= 0 && yCoord < 10) {
                corners.push(`${xCoord}${yCoord}`);
            }
        }
    }

    return corners;
}


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
            const ships = { ...state.ships };
            const cells = { ...state.cells };
            const shipToAdd = action.payload;
            cells[shipToAdd.key] = {id: shipToAdd.id};
            ships[shipToAdd.id] = getShipPosition(shipToAdd.x, shipToAdd.y, shipToAdd.size);

            return {
              ...state,
              cells: cells,
              ships: ships
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
            const destroyOpponentShip = action.payload.destroyed;

            hits.opponentBoard[action.payload.key] = {hit: action.payload.hit};

            if (destroyOpponentShip) {
                hits.opponentBoard[destroyOpponentShip.startPos].destroyed = {
                    size: destroyOpponentShip.size,
                    orientation: destroyOpponentShip.orientation
                }
            }

            return {
                ...state,
                hits: hits,
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
                hits: takeShots,
                currentTurn: !action.payload.hit
            };

        default:
          return state;
    }
};
