import  { Dispatch as ReduxDispatch } from 'redux';

import  { GameState, GameAction } from './game';
import  { SocketAction, SocketState } from "./sockets";

export type ReduxInitAction = { type: '@@INIT' };

export type State = GameState & SocketState;

export type Action = ReduxInitAction | GameAction | SocketAction;

export type Dispatch = ReduxDispatch<Action>;
