// @flow

import type { Dispatch as ReduxDispatch } from 'redux';

import type { GameState, GameAction } from './game';
import type {SocketAction, SocketState} from "./sockets";

export type ReduxInitAction = { type: '@@INIT' };

export type State = GameState & SocketState;

export type Action = ReduxInitAction | GameAction | SocketAction;

export type Dispatch = ReduxDispatch<Action>;