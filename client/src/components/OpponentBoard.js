/**
 * Created by Kasutaja on 08.01.2018.
 */
import React, { Component } from 'react';
import classnames from 'classnames';
import Board from '../containers/Board';

const OpponentBoard = (props) => {

    const handleGameStart = () => {

        const { joinGame, socket, ships } = props;

        if (Object.keys(ships).length) {
            joinGame(socket, ships);
        }
    };

    const handleCellClick = (cellProps) => {
        const { readyForBattle, hits, currentTurn, shootAtCell, socket } = props;

        const cellId = cellProps.key;

        if (readyForBattle && currentTurn && !hits.opponentBoard[cellId]) {
            shootAtCell(socket, cellId);
        }
    };

    const cellClasses = (key) => {
        const { hits } = props;

        return classnames({
            hit: hits.opponentBoard[key] && hits.opponentBoard[key].hit,
            miss: hits.opponentBoard[key] && !hits.opponentBoard[key].hit
        });
    };

    const shipClasses = () => {
        return classnames({
            destroyed: true
        });
    };

    const boardProps = {
        isOpponent: true,
        onCellClick: cellProps => handleCellClick(cellProps),
        cellClasses: key => cellClasses(key),
        shipClasses: shipClasses()
    };

    const { opponentWaiting, currentTurn, readyForBattle, ships } = props;

    return (
        <div id="opponent-board">
            { !currentTurn &&
                <div className="board-overlay">
                    <div className="search-game">
                        { !readyForBattle && !opponentWaiting &&
                            <div>
                                <button className={"btn start-button " + (Object.keys(ships).length ? "btn-active" : "btn-disabled")}
                                        onClick={() => handleGameStart()}>Start game</button>
                            </div>
                        }
                    </div>
                </div>
            }
            <Board {...boardProps} />
            <p>Opponent Board</p>
        </div>
    );
};

export default OpponentBoard;
