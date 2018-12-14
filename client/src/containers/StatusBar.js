import React, {Component} from 'react';
import {connect} from 'react-redux';

export class StatusBar extends Component {
    render() {
        const { readyForBattle, opponentWaiting, currentTurn, gameOver, isWinner } = this.props;

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

const mapStateToProps = (state) => {
    return {
        readyForBattle: state.game.readyForBattle,
        opponentWaiting: state.game.opponentWaiting,
        currentTurn: state.game.currentTurn,
        gameOver: state.game.gameOver,
        isWinner: state.game.isWinner
    }
};

export default connect(mapStateToProps, null)(StatusBar);
