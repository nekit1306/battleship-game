/**
 * Created by Kasutaja on 15.04.2018.
 */
import React, {Component} from 'react';
import { getCoordinates} from '../utils/helpers';

class ButtonList extends Component {

    setupShipRandom = () => {
        const ships = getCoordinates();
        this.props.setupShipRandom(ships);
    };

    toggleManualSetup = () => {
        this.props.toggleManualSetup();
    };

    render() {
        return (
            <div className="action-sidenav">
                <div className="action-btn" onClick={() => this.toggleManualSetup()}>
                    <i className="fas fa-hand-paper"></i>
                </div>
                <div className="action-btn" onClick={() => this.setupShipRandom()}>
                    <i className="fas fa-random"></i>
                </div>
            </div>
        )
    }
};

export default ButtonList;