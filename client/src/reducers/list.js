import { LIST_ACTIONS } from '../consts/action_types';
import { LISTS } from '../consts/default_state';

function getShipPosition (x, y, size) {
    const position = [];
    for (let i = 0; i < size; i++) {
        position.push(`${x + i}${y}`);
    }
    return position;
}

function getRandomCoordinates () {
    const shipsSize = [4, 3, 2, 1];
    const corners = [];

    const ships = {};
    const cells = {};

    let shipId = 0;

    shipsSize.forEach((size, i) => {
        for(let a = 0; a <= i; a++) {

            let x = null;
            let y = null;

            do {
                 x = Math.floor(Math.random() * 10);
                 y = Math.floor(Math.random() * 10);
            } while ((x + size) > 9);

            console.log(calculateCorners(x, y, size));

            ships[shipId] = getShipPosition(x, y, size);
            cells[`${x}${y}`] = { shipId: shipId, shipSize: size};

            shipId++;
        }
    });

    return { ships: ships, cells: cells};
}


function calculateCorners (x, y, size) {

    const corners = [];

    let startPosX = x - 1;
    let startPosY = y - 1;

    for(let i = 0; i < size + 2; i++) {
        for(let a = 0; a < 3; a++) {
            if ( startPosX >= 0 && startPosX < 10 && startPosY >= 0 && startPosY < 10) {
                corners.push(`${startPosX}${startPosY}`);
            }
            startPosY++;
        }
        startPosX++;
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
            cells[shipToAdd.key] = {shipId: shipToAdd.id, shipSize: shipToAdd.size};
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
            hits.opponentBoard[action.payload.key] = { hit: action.payload.hit };

            return {
                ...state,
                hits: hits,
                currentTurn: action.payload.hit
            };

        case LIST_ACTIONS.SHOT_TAKE:
            const takeShots = {...state.hits};
            takeShots.userBoard[action.payload.key] = { hit: action.payload.hit };

            return {...state,
                hits: takeShots,
                currentTurn: !action.payload.hit
            };

        default:
          return state;
    }
};
