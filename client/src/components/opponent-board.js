/**
 * Created by Kasutaja on 08.01.2018.
 */
import React, { Component } from 'react';
import Board from '../containers/board';

class OpponentBoard extends Component {

    handleGameStart() {
        this.props.joinGame(this.props.socket);
    }

    handleCellClick(cellProps) {
        const { readyForBattle, currentTurn, shootAtBoard, socket } = this.props;

        if (readyForBattle && currentTurn) {
            shootAtBoard(socket, cellProps.key);
        }
    }

    render() {

        const boardProps = {
            socket: this.props.socket,
            opponentBoard: true,
            onCellClick: (cellProps) => this.handleCellClick(cellProps)
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
