import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UserBoard from "../containers/user-board";
import OpponentBoard from "../containers/opponent-board"
import ActionButtons from "../containers/action-buttons";
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

class PlayBoard extends Component {

    constructor(props) {
        super(props);
        this.props.loadInitialSockets(socket);
    }

    render() {
        const { shipPlacing, currentTurn} = this.props;
        return (
            <div className={"playing-area " + (shipPlacing ? 'ship-placing' : '')}>
                <ActionButtons/>
                <div className="field-clearfix">
                    <UserBoard socket={socket} currentTurn={currentTurn}  />
                    <OpponentBoard socket={socket} currentTurn={currentTurn} />
                </div>
            </div>
        );
    }
}

PlayBoard.propTypes = {
  listItems: PropTypes.object.isRequired,
};

export default PlayBoard;
