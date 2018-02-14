import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UserBoard from "../containers/UserBoard";
import OpponentBoard from "../containers/OpponentBoard"
import ActionButtons from "../containers/ActionButtons";
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

class PlayBoard extends Component {

    constructor(props) {
        super(props);
        this.props.loadInitialSockets(socket);
    }

    render() {
        const { shipPlacing, currentTurn, hits, readyForBattle, opponentWaiting} = this.props;

        const boardProps = {
            socket: socket,
            currentTurn: currentTurn,
            hits: hits
        };

        return (
            <div className={"playing-area " + (shipPlacing ? 'ship-placing' : '')}>
                { !readyForBattle && !opponentWaiting &&
                    <ActionButtons/>
                }
                <div className="field-clearfix">
                    <UserBoard {...boardProps} />
                    <OpponentBoard {...boardProps} />
                </div>
            </div>
        );
    }
}

PlayBoard.propTypes = {
  listItems: PropTypes.object.isRequired,
};

export default PlayBoard;