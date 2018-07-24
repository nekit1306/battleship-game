import React from 'react';

const Header = (props) => {

    const {readyForBattle, opponentWaiting, currentTurn, gameOver, isWinner} = props;

    const renderActionTitle = () => {

        if (!readyForBattle && !opponentWaiting) {
            return "Place all ships";
        }

        if (gameOver) {
            return isWinner ? "You have Won" : "You have lost";
        }

        if (opponentWaiting) {
            return "Waiting for opponent...";
        }

        if (currentTurn) {
            return "Your turn";
        }

        if (!currentTurn) {
            return "Opponent Turn";
        }
    };


    return (
        <div className="l-header">
            <div className="header-title">
                <h1 className="entry-title">
                    BATTLESHIP v0.4
                    <span className="badge badge-pill badge-secondary float-right">2 Players</span>
                </h1>
                <div className="col-md-4 offset-md-4 text-center">
                    <div className="cf-wrapper" style={{marginTop: '20px'}}>
                        <p className="cf-text">Rollbar: Real-time error monitoring, alerting, and analytics for
                            JavaScript developers 🚀</p>
                    </div>
                </div>
                <div className="col-md-8 offset-md-2 text-center">
                    <span className="action-title">{renderActionTitle()}</span>
                </div>
            </div>
        </div>
    )
};

export default Header;
