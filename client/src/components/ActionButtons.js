import React from 'react';

const ActionButtons = (props) => {

    const {readyForBattle, opponentWaiting} = props;

    const renderActionTitle = () => {

        if (!readyForBattle && !opponentWaiting) {
            return (
                <div>
                    <div className="action-btn" onClick={() => props.setupShipRandom()}>
                        <i className="fas fa-random"></i>
                    </div>
                    <div className="action-btn" onClick={() => props.toggleShipPlacing()}>
                        <i className="fas fa-hand-paper"></i>
                    </div>
                </div>
            );
        }
    };

    return (
        <div className="action-sidenav">
            {renderActionTitle()}
        </div>
    );
};

export default ActionButtons;