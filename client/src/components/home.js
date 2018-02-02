import React from 'react';
import PlayBoard from '../containers/playboard';

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
            <div className="main-page">
                <div className="header-title">
                    <h1 className="entry-title">BATTLESHIP v0.4</h1>
                    <div className="divider gradient"></div>
                    <div className="action-status">
                        <div className="entry-task">
                            <span className="task-text">{this.renderTitle()}</span>
                            <span className="fa fa-arrow-down fa-2x task-icon"></span>
                        </div>
                    </div>
                </div>
                <PlayBoard />
            </div>
        );
    }
}

export default Home;
