import  { Dispatch as ReduxDispatch } from 'redux';

import  { GameState, GameAction } from './game';
import  { SocketAction, SocketState } from "./sockets";

export interface AppState {
    game  : GameState,
    socket: SocketState
}

export type ReduxInitAction = { type: '@@INIT' };

export type Action = ReduxInitAction | GameAction | SocketAction;

export type Dispatch = ReduxDispatch<Action>;
