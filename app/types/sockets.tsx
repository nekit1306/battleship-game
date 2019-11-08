import { UPDATE_SOCKET } from 'utils/constants';

export interface SocketState {
    socket: any
}

export type SocketAction =
    | { type: typeof UPDATE_SOCKET, payload: any }
