/**
 * Created by Kasutaja on 15.04.2018.
 */
import React from 'react';

const ButtonList = (props) => {
    if (!props.readyForBattle && !props.opponentWaiting) {
        return (
            <div className="action-sidenav">
                <div className="action-btn" onClick={() => props.setupShipRandom}>
                    <i className="fas fa-hand-paper"></i>
                </div>
                <div className="action-btn" onClick={() => props.setupShipRandom}>
                    <i className="fas fa-hand-paper"></i>
                </div>
            </div>
        )
    }
};

export default ButtonList;