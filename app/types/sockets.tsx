// @flow

export interface Socket {
    socket: any
}

export interface SocketState {
    socket: Socket
}

export type SocketAction =
    | { type: 'UPDATE_SOCKET', socket: any }
