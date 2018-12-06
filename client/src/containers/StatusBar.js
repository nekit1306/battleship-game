import React from 'react';

class StatusBar extends Component {

    render() {
        const { readyForBattle, opponentWaiting, currentTurn, gameOver, isWinner } = props;

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
            <div className="col-md-8 offset-md-2 text-center">
                { renderActionTitle }
            </div>
        )
    }
}

export default StatusBar;
