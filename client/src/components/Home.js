import React, { Component } from 'react';
import PlayBoard from '../containers/PlayBoard';

class Home extends Component {

    renderTitle() {
        const { currentTurn, readyForBattle, opponentWaiting, gameOver, isWinner } = this.props;

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

        const { gameOver } = this.props;

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
                <div className="announcements-list">
                    <div className="announcements-item item">
                        <h3 className="title">New: We're on Twitter ♥️
                        </h3>
                        <div className="body"><p>Follow <a href="https://twitter.com/devhints">@devhints</a> on Twitter for daily “today I learned” snippets!</p>
                            <p><a href="https://twitter.com/devhints"><img src="https://img.shields.io/twitter/follow/devhints.svg?style=social&amp;label=@devhints" alt="" /></a></p>
                        </div>
                        <button className="close"></button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
