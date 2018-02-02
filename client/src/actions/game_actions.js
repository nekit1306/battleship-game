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


// Socket actions

export const loadInitialSockets = socket => {
    return (dispatch) => {
        socket.on(SOCKET_ACTIONS.GAME_START, () => {
            dispatch(readyForBattle());
        });

        socket.on(SOCKET_ACTIONS.USER_LEFT, () => {
            dispatch(startGame());
        });

        socket.on(SOCKET_ACTIONS.HIT, () => {
            dispatch(startGame());
        });
    }
};


export const joinGame = socket => {
    return (dispatch) => {
        socket.emit(SOCKET_ACTIONS.GAME_JOIN);
        dispatch(waitForOpponent());
    }
};

export const shootAtBoard = (socket, cell) => {
    return (dispatch) => {
        socket.emit(SOCKET_ACTIONS.SHOOT, cell);
    }
};

