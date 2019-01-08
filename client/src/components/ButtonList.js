/**
 * Created by Kasutaja on 15.04.2018.
 */
import React from 'react';

const ButtonList = (props) => {
    return (
        <div className="action-sidenav">
            <div className="action-btn" onClick={() => props.toggleShipPlacing()}>
                <i className="fas fa-hand-paper"></i>
            </div>
            <div className="action-btn" onClick={() => props.setupShipRandom()}>
                <i className="fas fa-random"></i>
            </div>
        </div>
    )
};

export default ButtonList;