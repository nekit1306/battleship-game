import { LIST_ACTIONS, SOCKET_ACTIONS} from '../consts/action_types';


export const toggleShipPlacing = () => ({
    type: LIST_ACTIONS.SHIP_PLACING_TOGGLE,
});

export const waitForOpponent = () => ({
    type: LIST_ACTIONS.OPPONENT_WAITING,
});

export const readyForBattle = () => ({
    type: LIST_ACTIONS.BATTLE_READY,
});

export const selectShip = ship => ({
    type: LIST_ACTIONS.SHIP_SELECT,
    payload: ship
});

export const setupShip = ship => ({
    type: LIST_ACTIONS.SHIP_SETUP,
    payload: ship
});

export const startGame = () => ({
    type: LIST_ACTIONS.GAME_START,
});


// socket actions


export const loadInitialSockets = (socket) => {
    return (dispatch) => {
        socket.on(SOCKET_ACTIONS.GAME_START, () => {
            dispatch(startGame());
        });

        socket.on(SOCKET_ACTIONS.USER_SHOOT, () => {
            dispatch(startGame());
        });

        socket.on(SOCKET_ACTIONS.USER_LEFT, () => {
            dispatch(startGame());
        });
    }
};


export const joinGame = (socket) => {
    return (dispatch) => {
        socket.emit(SOCKET_ACTIONS.USER_JOIN);
        dispatch(waitForOpponent());
    }
};

export const hitCell = socket => {
    return (dispatch) => {
        socket.emit(SOCKET_ACTIONS.CELL_HIT);
    }
};

