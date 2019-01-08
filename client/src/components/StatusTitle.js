import React, { Component } from 'react';

class StatusTitle extends Component {

    renderActionTitle = () => {
        const { readyForBattle, opponentWaiting, currentTurn, gameOver, isWinner } = this.props;

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

    render() {
        return (
            <div className="col-md-8 offset-md-2 text-center">
                { this.renderActionTitle }
            </div>
        )
    }
}

export default StatusTitle;