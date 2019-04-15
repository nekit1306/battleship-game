import React, {Component} from 'react';
import {connect} from 'react-redux';
import StatusTitle from '../components/StatusTitle';

export class StatusBar extends Component {
    render() {
        return (
            <StatusTitle {...this.props}/>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        // currentTurn    : state.game.currentTurn,
        gameOver       : state.game.gameOver,
        isWinner       : state.game.isWinner
    }
};

export default connect(mapStateToProps, null)(StatusBar);
