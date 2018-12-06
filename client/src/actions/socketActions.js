/**
 * Created by Kasutaja on 17.04.2018.
 */
import { SOCKET_UPDATE } from "../constants/ActionTypes";

// Socket actions

export const updateSocket = socket => ({
    type: SOCKET_UPDATE,
    payload: socket
});
