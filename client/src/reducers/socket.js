/**
 * Created by Kasutaja on 15.04.2018.
 */

import { SOCKET_UPDATE } from '../actions/sockets'

const INITIAL_STATE = {
    socket: null
};

const socketReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SOCKET_UPDATE:
            return {
                ...state,
                socket: action.payload
            };

        default:
            return state;

    }
};

export default socketReducer;