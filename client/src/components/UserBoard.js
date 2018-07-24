/**
 * Created by Kasutaja on 08.01.2018.
 */
import React, { Component } from 'react';
import classnames from 'classnames';
import ActionButtons from "../containers/ActionButtons";
import Board from '../containers/Board';
import ShipBoxFake from '../containers/ShipBoxFake'

const UserBoard = (props) => {

    const handleCellClick = cellProps => {
        const { selectedShip, ships, setupShipManual, toggleShipPlacing} = props;
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
    };


    const cellClasses = key => {
        const { hits } = props;

        return classnames({
            hit: hits.userBoard[key] && hits.userBoard[key].hit,
            miss: hits.userBoard[key] && !hits.userBoard[key].hit
        });
    };

    const shipClasses = key => {
        const { hits } = props;

        return classnames({
            destroyed: hits.userBoard[key] && hits.userBoard[key].destroyed,
        });
    };

    const boardProps = {
        isOpponent: false,
        onCellClick: cellProps => handleCellClick(cellProps),
        cellClasses: key => cellClasses(key),
        shipClasses: key => shipClasses(key)
    };

    return (
        <div id="user-board">
            <ShipBoxFake />
            <Board {...boardProps} />
            <p>User Board</p>
        </div>
    );
};

export default UserBoard;
