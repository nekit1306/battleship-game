import * as React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { startNewGame } from "actions/game";
import {Dispatch, State} from "types";

import StatusTitle from '../components/StatusTitle';

const mapStateToProps = (state: State) => {
    return {
        currentTurn: state.game.currentTurn,
        gameState  : state.game.gameState,
        winnerId   : state.game.winnerId
    }
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators(startNewGame, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(StatusTitle);
