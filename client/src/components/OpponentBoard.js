/**
 * Created by Kasutaja on 08.01.2018.
 */
import React, { Component } from 'react';
import classnames from 'classnames';
import Board from '../containers/Board';

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

    shipClasses() {
        return classnames({
            destroyed: true
        });
    }

    render() {

        const boardProps = {
            socket: this.props.socket,
            isOpponent: true,
            onCellClick: cellProps => this.handleCellClick(cellProps),
            cellClasses: key => this.cellClasses(key),
            shipClasses: this.shipClasses()
        };

        const { opponentWaiting, currentTurn, readyForBattle } = this.props;

        return (
            <div id="opponent-board">
                { !currentTurn &&
                    <div className="board-overlay">
                        <div className="search-game">
                            { !readyForBattle && !opponentWaiting &&
                                <div className="start-btn">
                                    <button className="btn btn-rounded" onClick={() => this.handleGameStart()}>Start game</button>
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
