/**
 * Created by Kasutaja on 15.04.2018.
 */

const socketInitialState = {
    socket: null
};

const socketReducer = (state = socketInitialState, action) => {
    switch (action.type) {
        case SOCKET_ACTIONS.SOCKET_UPDATE:
            return {
                ...state,
                socket: action.payload
            };

        default:
            return state;

    }
};

export default socketReducer;