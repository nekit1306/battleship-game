import React, { Component } from 'react';

class Header extends Component {

    renderTitle() {
        const {currentTurn, readyForBattle, opponentWaiting, gameOver, isWinner} = this.props;

        let title = null;

        if (gameOver) {
            return isWinner ? "You have Won" : "You have Lost";
        }

        if (!readyForBattle && !opponentWaiting) {
            title = "Place all ships";
        } else if (opponentWaiting) {
            title = "Opponent waiting..."
        } else if (!currentTurn) {
            title = "Opponent turn";
        } else if (currentTurn) {
            title = "Your turn";
        }

        return title;
    }

    render() {
        return (
            <div className="header-title">
                <h1 className="entry-title">BATTLESHIP v0.4</h1>
                <p className="entry-desc text-center">Real-time error monitoring, alerting, and analytics for developers 🚀</p>
                <div className="action-status">
                    <div className="entry-task">
                        <div className="divider"></div>
                        <span className="task-text">{this.renderTitle()}</span>
                    </div>
                </div>
            </div>
        )
    }

}

export default Header;
