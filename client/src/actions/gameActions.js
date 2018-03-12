import { LIST_ACTIONS, SOCKET_ACTIONS} from '../consts/actionTypes';


export const toggleShipPlacing = () => ({
    type: LIST_ACTIONS.SHIP_PLACING_TOGGLE,
});

export const waitForOpponent = () => ({
    type: LIST_ACTIONS.OPPONENT_WAITING,
});

export const readyForBattle = currentTurn => ({
    type: LIST_ACTIONS.BATTLE_READY,
    payload: currentTurn
});

export const selectShip = ship => ({
    type: LIST_ACTIONS.SHIP_SELECT,
    payload: ship
});

export const setupShipManual = ship => ({
    type: LIST_ACTIONS.SHIP_SETUP_MANUAL,
    payload: ship
});

export const setupShipRandom = () => ({
    type: LIST_ACTIONS.SHIP_SETUP_RANDOM,
});


export const hitCell = cell => ({
    type: LIST_ACTIONS.CELL_HIT,
    payload: cell
});

export const takeShot = cell => ({
    type: LIST_ACTIONS.SHOT_TAKE,
    payload: cell
});

export const gameOver = winner => ({
    type: LIST_ACTIONS.GAME_OVER,
    payload: winner
});

export const gameReset = () => ({
    type: LIST_ACTIONS.GAME_RESET,
});

// Socket actions

export const loadInitialSockets = socket => {
    return (dispatch) => {
        socket.on(SOCKET_ACTIONS.GAME_START, currentTurn => {
            dispatch(readyForBattle(currentTurn));
        });

        socket.on(SOCKET_ACTIONS.HIT, cell => {
            dispatch(hitCell(cell));
        });

        socket.on(SOCKET_ACTIONS.SHOT_TAKE, cell => {
            dispatch(takeShot(cell));
        });

        socket.on(SOCKET_ACTIONS.USER_LEFT, () => {
            // some dispatch
        });

        socket.on(SOCKET_ACTIONS.GAME_OVER, winner => {
            console.log('game over');
            dispatch(gameOver(winner));
        });

    }
};


export const joinGame = (socket, board) => {
    return (dispatch) => {
        socket.emit(SOCKET_ACTIONS.GAME_JOIN, board);
        dispatch(waitForOpponent());
    }
};

    export const shootAtCell = (socket, cell) => {
    return (dispatch) => {
        socket.emit(SOCKET_ACTIONS.SHOOT, cell);
    }
};

