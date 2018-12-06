/**
 * Created by Kasutaja on 08.01.2018.
 */
import React, { Component } from 'react';
import classnames from 'classnames';
import Board from '../components/Board';
import ShipBoxFake from '../containers/ShipBoxFakeContainer'

const UserBoard = (props) => {
    const handleCellClick = cellProps => {
        const { selectedShip, ships, setupShipManual} = props;
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

    const cellClasses = key => {
        const { hit_points } = props;

        return classnames({
            hit: hit_points[key],
            miss: hit_points[key]
        });
    };

    const shipClasses = key => {
        const { hit_points, destroyed } = props;

        return classnames({
            ship_destroyed: destroyed[key]
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
