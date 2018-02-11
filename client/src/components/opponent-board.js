/**
 * Created by Kasutaja on 08.01.2018.
 */
import React, { Component } from 'react';
import classnames from 'classnames';
import Board from '../containers/board';

class OpponentBoard extends Component {

    handleGameStart() {

        const { joinGame, socket, ships } = this.props;

        joinGame(socket, ships);
    }

    handleCellClick(cellProps) {
        const { readyForBattle, hits, currentTurn, shootAtCell, socket } = this.props;

        const cellId = cellProps.key;

        if (readyForBattle && currentTurn && !hits.opponentBoard[cellId]) {
            shootAtCell(socket, cellId);
        }
    }

    cellClasses(key) {
        const { hits } = this.props;

        return classnames({
            hit: hits.opponentBoard[key] && hits.opponentBoard[key].hit,
            miss: hits.opponentBoard[key] && !hits.opponentBoard[key].hit
        });
    }

    render() {

        const boardProps = {
            socket: this.props.socket,
            opponentBoard: true,
            onCellClick: cellProps => this.handleCellClick(cellProps),
            classes: key => this.cellClasses(key)
        };

        const { opponentWaiting, currentTurn, readyForBattle } = this.props;

        return (
            <div id="opponent-board">
                { !currentTurn &&
                    <div className="board-overlay">
                        <div className="search-game">
                            { !readyForBattle && !opponentWaiting &&
                                <div className="start-btn">
                                    <button onClick={() => this.handleGameStart()} className="btn btn-rounded">Start game</button>
                                </div>
                            }
                            { opponentWaiting &&
                                <div className="">
                                    <span className="fa fa-spinner fa-spin fa-2x"></span>
                                </div>
                            }
                        </div>
                    </div>
                }
                <Board {...boardProps} />
            </div>
        )
    }
}

export default OpponentBoard;
