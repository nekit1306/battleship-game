/**
 * Created by Kasutaja on 08.01.2018.
 */
import React, { Component } from 'react';
import classnames from 'classnames';
import Board from '../containers/Board';

class OpponentBoard extends Component{

    handleGameStart = () => {

        const { joinGame, ships } = props;

        if (Object.keys(ships).length > 0) {
            joinGame(ships);
        }
    };

    handleCellClick = (cellProps) => {
        const { readyForBattle, hit_points, currentTurn, shootAtCell } = props;

        const cellId = cellProps.key;

        if (readyForBattle && currentTurn && !hit_points[cellId]) {
            shootAtCell(cellId);
        }
    };

    render() {
        const cellClasses = (key) => {
            const hasPoints = this.props.hitPoints[key];

            return classnames({
                miss         : !hasPoints,
                ship_damaged : hasPoints,
            });
        };

        const shipClasses = () => {
            return classnames({
                ship_destroyed: true
            });
        };

        const boardProps = {
            isOpponent : true,
            onCellClick: cellProps => this.handleCellClick(cellProps),
            cellClasses: key => cellClasses(key),
            shipClasses: shipClasses()
        };

        return (
            <div id="opponent-board">
                { !currentTurn &&
                <div className="board-overlay">
                    <div className="search-game">
                        { !readyForBattle && !opponentWaiting &&
                        <div>
                            <button className={"btn start-button " + (Object.keys(ships).length > 0 ? "btn-active" : "btn-disabled")}
                                    onClick={() => this.handleGameStart()}>Start game</button>
                        </div>
                        }
                    </div>
                </div>
                }
                <Board {...boardProps} />
                <p>Opponent Board</p>
            </div>
        );
    }

};

export default OpponentBoard;
