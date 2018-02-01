/**
 * Created by Kasutaja on 08.01.2018.
 */
import React, { Component } from 'react';
import Board from '../containers/board';

class OpponentBoard extends Component {

    handleGameStart() {
        this.props.joinGame(this.props.socket);
    }

    handleCellClick() {
        console.log('click-opponent');
    }

    render() {

        const boardProps = {
            socket: this.props.socket,
            opponentBoard: true,
            onCellClick: (cellProps) => this.handleCellClick(cellProps)
        };

        const { opponentWaiting, currentTurn } = this.props;

        return (
            <div id="opponent-board">
                { !currentTurn &&
                    <div className="board-overlay">
                        <div className="search-game">
                            {opponentWaiting ? (
                                    <div className="">
                                        <span className="fa fa-spinner fa-spin fa-2x"></span>
                                        <p>Waiting for Opponent ...</p>
                                    </div>
                                ) : (
                                    <div className="start-btn">
                                        <button onClick={() => this.handleGameStart()} className="btn btn-rounded">Start game</button>
                                    </div>
                                )
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
