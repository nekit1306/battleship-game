import * as React from 'react';
import { Component } from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import Board from '../components/Board';
import { joinGame, shootAtCell } from 'actions/game';
import { GameStatus } from "utils/constants";
import {Dispatch, State} from 'types';

interface Props {
    enemyHits: any[],
    ships: any[],
    hits: any[],
    currentTurn: boolean,
    gameState: number,
    socket: any,
    joinGame: (socket: any, ships: ShipsModel[]) => void,
    shootAtCell: (socket: any, key: string) => void,
}

class OpponentBoard extends Component<Props> {
    handleCellClick = (key: string) => {
        const { socket, currentTurn, shootAtCell, gameState, hits } = this.props;

        const hitCell = hits.find(it => it.id === key);

        if (gameState !== GameStatus.STARTED || !currentTurn || hitCell) {
            return;
        }

        shootAtCell(socket, key);
    };

    render() {
        const {hits, ships} = this.props;
        return (
            <Board onCellClick={(key: string) => this.handleCellClick(key)}
                   hits={hits}
                   ships={ships}
                   title={"Opponent Board"} />
        );
    }
}

const mapStateToProps = (state: State) => {
    return {
        hits           : state.game.enemyHits,
        currentTurn    : state.game.currentTurn,
        ships          : state.game.enemyShips,
        gameState      : state.game.gameState,
        socket         : state.socket.socket,
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators({
        shootAtCell,
        joinGame
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(OpponentBoard);

