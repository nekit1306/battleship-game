/**
 * Created by Kasutaja on 17.04.2018.
 */
import { UPDATE_SOCKET } from "./types";

// Socket actions
export const updateSocket = (socket: any) => ({
    type   : UPDATE_SOCKET,
    payload: socket
});
