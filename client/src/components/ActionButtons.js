/**
 * Created by Kasutaja on 08.01.2018.
 */

import React from 'react';

class ActionButtons extends Component {

    render() {
        const { readyForBattle, opponentWaiting } = this.props;

        const renderButton = () => {
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
                {renderButton()}
            </div>
        );
    }

};

export default ActionButtons;