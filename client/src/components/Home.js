import React, { Component } from 'react';
import PlayBoard from '../containers/PlayBoard';

class Home extends Component {

    renderTitle() {
        const { currentTurn, readyForBattle, opponentWaiting } = this.props;
        let title = null;

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
            <div className="home-page">
                <div className="header-title">
                    <h1 className="entry-title">BATTLESHIP v0.4</h1>
                    <div className="divider"></div>
                    <div className="action-status">
                        <div className="entry-task">
                            <span className="task-text">{this.renderTitle()}</span>
                        </div>
                    </div>
                </div>
                <PlayBoard />
            </div>
        );
    }
}

export default Home;
