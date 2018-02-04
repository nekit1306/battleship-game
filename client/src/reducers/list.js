import { LIST_ACTIONS } from '../consts/action_types';
import { LISTS } from '../consts/default_state';

function getShipPosition (x, y, size) {
    const position = [];
    for (let i = 0; i < size; i++) {
        position.push(`${x + i}${y}`);
    }
    return position;
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

        case LIST_ACTIONS.SHIP_SETUP:
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

        case LIST_ACTIONS.SHIP_SELECT:
            return {...state, selectedShip: action.payload};

        case LIST_ACTIONS.GAME_START:
            return {
                ...state,
                opponentWaiting: false,
                currentTurn: action.payload
            };

        case LIST_ACTIONS.CELL_HIT:
            const hitCells = {...state.cells};

            hitCells[action.payload.key] = { hit: action.payload.hit};

            return {...state, cells: hitCells};

        default:
          return state;
    }
};
