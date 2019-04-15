/**
 * Created by Kasutaja on 08.01.2018.
 */
import React, { Component } from 'react';
import classnames from 'classnames';
import Board from '../components/Board';
import {connect} from 'react-redux';

class UserBoard extends Component {

    handleCellClick = (cellProps) => {
        const { selectedShip, ships, setupShipManual } = this.props;

        if (selectedShip.id !== null && !ships[selectedShip.id]) {
            const ship = {
                id  : selectedShip.id,
                size: selectedShip.size,
                key : cellProps.key,
                x   : cellProps.x,
                y   : cellProps.y
            };

            setupShipManual(ship);
        }
    };

    render() {
        const cellClasses = key => {
            return classnames({
                hit : false,
                miss: false
            });
        };

        const shipClasses = key => {
            return classnames({
                ship_destroyed: this.props.destroyed[key]
            });
        };

        const boardProps = {
            isOpponent : false,
            onCellClick: cellProps => this.handleCellClick(cellProps),
            cellClasses: key => cellClasses(key),
            shipClasses: key => shipClasses(key),
            title      : "My Board"
        };

        return (
            <div id='user-board'>
                <Board {...boardProps} />
            </div>
        );
    };
}

const mapStateToProps = (state) => {
    return {
        hit_points  : state.game.userBoard.hitPoints,
        destroyed   : state.game.userBoard.destroyed,
        selectedShip: state.game.selectedShip,
        ships       : state.game.ships
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setupShipManual: () => {
            dispatch(setupShipManual())
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserBoard);

