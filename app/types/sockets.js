// @flow

export type Socket = {
    +socket: any
}

export type SocketState = {
    socket: Socket
};

export type SocketAction =
    | { type: 'UPDATE_SOCKET', +socket: any }
