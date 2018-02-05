/**
 * Created by Kasutaja on 08.01.2018.
 */
import React, { Component } from 'react';
import classnames from 'classnames';
import Board from '../containers/board';

class OpponentBoard extends Component {

    handleGameStart() {

        const { joinGame, socket } = this.props;

        joinGame(socket);
    }

    handleCellClick(cellProps) {
        const { readyForBattle, currentTurn, shootAtCell, socket } = this.props;

        if (readyForBattle && currentTurn) {
            shootAtCell(socket, cellProps.key);
        }
    }

    cellClasses(key) {

        const { hits } = this.props;

        const classes = classnames({
            hit: hits.opponentBoard[key]
        });

        return classes;
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
