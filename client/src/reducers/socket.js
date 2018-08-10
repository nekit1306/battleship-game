/**
 * Created by Kasutaja on 15.04.2018.
 */
import { INITIAL_SOCKET_STATE } from '../consts/defaultState';
import { SOCKET_ACTIONS } from "../consts/actionTypes";

export default (state = INITIAL_SOCKET_STATE, action) => {
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