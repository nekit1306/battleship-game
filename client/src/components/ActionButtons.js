import React from 'react';

const ActionButtons = props => (
    <div className="action-sidenav">
        <div className="action-btn">
            <span className="fa fa-random randomizeBtn" onClick={() => props.toggleShipPlacing()}></span>
        </div>
        <div className="action-btn">
            <span className="fa fa-arrows itselfBtn" onClick={() => props.setupShipRandom()}></span>
        </div>
    </div>
);

export default ActionButtons;