/**
 * Created by Kasutaja on 08.01.2018.
 */
import React, { Component } from 'react';
import classnames from 'classnames';
import Board from '../containers/board';
import ShipBoxFake from '../containers/ship-box-fake'

class UserBoard extends Component {

    handleCellClick(cellProps) {
        const { selectedShip, ships, setupShipManual, toggleShipPlacing} = this.props;
        if (selectedShip.id !== null && !ships[selectedShip.id]) {

            const ship = {
                id  : selectedShip.id,
                size: selectedShip.size,
                key : cellProps.key,
                x: cellProps.x,
                y: cellProps.y
            };

            setupShipManual(ship);
        }
        if(Object.keys(ships).length === 10) {
            toggleShipPlacing();
        }
    }


    cellClasses(key) {
        const { hits } = this.props;

        return classnames({
            hit: hits.userBoard[key] && hits.userBoard[key].hit

        });

    }


    render(){
        const boardProps = {
            opponentBoard: false,
            onCellClick: cellProps => this.handleCellClick(cellProps),
            classes: key => this.cellClasses(key)
        };

        return (
            <div id="user-board">
                <ShipBoxFake />
                <Board {...boardProps} />
            </div>
        );
    }
}

export default UserBoard;
