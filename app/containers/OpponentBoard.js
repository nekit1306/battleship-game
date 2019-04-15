/**
 * Created by Kasutaja on 08.01.2018.
 */
import React, { Component } from 'react';
import classnames from 'classnames';
import Board from '../components/Board';
import {connect} from 'react-redux';
import Overlay from '../components/Overlay';

class OpponentBoard extends Component {

    handleGameStart = () => {
        const { joinGame, ships } = props;

        if (Object.keys(ships).length > 0) {
            joinGame(ships);
        }
    };

    handleCellClick = (cellProps) => {
        const {hit_points, currentTurn, shootAtCell } = props;

        const cellId = cellProps.key;

        if (currentTurn && !hit_points[cellId]) {
            shootAtCell(cellId);
        }
    };

    render() {
        const { currentTurn, ships} = this.props;

        const cellClasses = key => {

            return classnames({
                miss         : false,
                ship_damaged : false,
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
            shipClasses: shipClasses(),
            title      : 'Opponent Board'
        };

        return (
            <div id='opponent-board'>
                { !currentTurn &&
                    <Overlay ships={ships}
                             currentTurn={currentTurn}
                             onButtonClick={() => this.handleGameStart()}/>
                }
                <Board {...boardProps} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        hit_points     : state.game.opponentBoard.hitPoints,
        destroyed      : state.game.opponentBoard.destroyed,
        selectedShip   : state.game.selectedShip,
        ships          : state.game.ships,
        currentTurn    : state.game.currentTurn
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setupShipManual: () => {
            dispatch(setupShipManual())
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(OpponentBoard);

