/**
 * Created by Kasutaja on 17.04.2018.
 */
import { SOCKET_UPDATE } from "./types";

// Socket actions

export const updateSocket = socket => ({
    type: UPDATE_SOCKET,
    payload: socket
});
