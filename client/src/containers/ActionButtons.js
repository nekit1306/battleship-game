/**
 * Created by Kasutaja on 08.01.2018.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import { toggleShipPlacing, setupShipRandom } from '../actions/game';

import ButtonList from '../components/ButtonList';

class ActionButtons extends Component {
    render() {
        const { readyForBattle, opponentWaiting } = this.props;

        if (!readyForBattle && !opponentWaiting) {
            return (
                <ButtonList {...this.props} />
            );
        }
    }
}

const mapStateToProps = (state) => {
    return {
        readyForBattle : state.game.readyForBattle,
        opponentWaiting: state.game.opponentWaiting,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setupShipRandom: () => {
            dispatch(setupShipRandom())
        },
        toggleShipPlacing: () => {
            dispatch(toggleShipPlacing())
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ActionButtons);
