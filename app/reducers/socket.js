/**
 * Created by Kasutaja on 15.04.2018.
 */

import { UPDATE_SOCKET } from '../actions/types';
import type {SocketState} from "../types/sockets";
import type {Action} from "../types";

const INITIAL_STATE = {
    socket: null
};

const socketReducer = (state: SocketState = INITIAL_STATE, action: Action) => {
    switch (action.type) {
        case UPDATE_SOCKET:
            return {
                ...state,
                socket: action.payload
            };

        default:
            return state;

    }
};

export default socketReducer;