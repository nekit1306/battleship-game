/**
 * Created by Kasutaja on 08.01.2018.
 */
import React, { Component } from 'react';
import Board from '../containers/board';
import ShipBoxFake from '../containers/ship-box-fake'

class UserBoard extends Component {

    handleCellClick(cellProps) {
        const { selectedShip, ships, setupShip, toggleShipPlacing} = this.props;
        if(selectedShip.id !== null && ships[selectedShip.id] === null) {
            const ship = {
                id  : selectedShip.id,
                size: selectedShip.size,
                key : cellProps.key,
                x: cellProps.x,
                y: cellProps.y
            };
            setupShip(ship);
        }
        if(Object.keys(ships).length === 10) {
            toggleShipPlacing();
        }
    }

    render(){
        const boardProps = {
            opponentBoard: false,
            onCellClick: (cellProps) => this.handleCellClick(cellProps)
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
