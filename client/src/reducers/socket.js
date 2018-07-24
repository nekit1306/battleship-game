/**
 * Created by Kasutaja on 15.04.2018.
 */
import { SOCKET } from '../consts/defaultState';
import {SOCKET_ACTIONS} from "../consts/actionTypes";

export default (state = SOCKET, action) => {
    switch (action.type) {
        case SOCKET_ACTIONS.SOCKET_UPDATE:
            return {
                ...state,
                socket: action.payload
            };

        default:
            return state;

    }
}