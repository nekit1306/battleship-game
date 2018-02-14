/**
 * Created by Kasutaja on 14.01.2018.
 */

import React, { Component } from 'react';
import classnames from 'classnames';

class ShipBoxFake extends Component {


    onShipClick(ship) {
        this.props.selectShip(ship);
    }


    renderShips() {
        const { selectedShip, ships } = this.props;

        let rows = [];
        let counter = 0;

        for(let i = 4; i > 0; i--) {
            let shipList = [];
            for (let a = 4; a > i - 1; a--) {

                const ship = {id: counter++, size: i};

                const classes = classnames({
                    active: selectedShip.id === ship.id,
                    placed: ships[ship.id] !== undefined
                });

                shipList.push(
                    <div onClick={() => this.onShipClick(ship)}
                         className={`ship-box-fake ship-fake-${i} ` + classes}>
                    </div>
                )
            }
            rows.push(<div className="ship-box-fake-row">{shipList}</div>);
        }
        return rows;
    }


    render() {
        return (
            <div className ="ship-box-fake-block">
                {this.renderShips()}
            </div>
        );
    }
}


export default ShipBoxFake;
