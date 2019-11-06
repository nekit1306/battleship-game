// @flow

import React, { Component } from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import Board from '../components/Board';
import { joinGame, shootAtCell } from '../actions/game';
import Overlay from '../components/Overlay';
import { GAME_START_STATE } from "../utils/constants";
import type {Dispatch, State} from "../types";
import type {DestroyedShip, Hit, Ship} from "../types/game";

type Props = {
    enemyHits: Hit[],
    ships: Ship[],
    enemyShips: DestroyedShip[],
    currentTurn: boolean,
    gameState: number,
    socket: any,
    joinGame: (socket: any, ships: Ship[]) => void,
    shootAtCell: (socket: any, key: string) => void,
}

class OpponentBoard extends Component<Props> {
    handleGameStart = () => { 
        const { joinGame, ships, socket } = this.props;

        if (ships.length > 0) {
            joinGame(socket, ships);
        }
    };

    handleCellClick = (key: string) => {
        const { socket, currentTurn, shootAtCell, gameState, enemyHits } = this.props;

        const hitCell = enemyHits.find(it => it.id === key);

        if (gameState !== GAME_START_STATE || !currentTurn || hitCell) {
            return;
        }

        shootAtCell(socket, key);
    };

    render() {
        const { gameState, enemyShips, ships, enemyHits, currentTurn } = this.props;

        return (
            <Board onCellClick={(key) => this.handleCellClick(key)}
                   ships={enemyShips}
                   hits={enemyHits}
                   title={"Opponent Board"}>
                <Overlay ships={ships}
                         gameState={gameState}
                         currentTurn={currentTurn}
                         onButtonClick={() => this.handleGameStart()}/> }
            </Board>
        );
    }
}

const mapStateToProps = (state: State) => {
    return {
        ships          : state.game.ships,
        enemyHits      : state.game.enemyHits,
        currentTurn    : state.game.currentTurn,
        enemyShips     : state.game.enemyShips,
        gameState      : state.game.gameState,
        socket         : state.socket.socket,
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators({
        joinGame,
        shootAtCell
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(OpponentBoard);

