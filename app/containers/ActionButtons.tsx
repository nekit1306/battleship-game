/**
 * Created by Kasutaja on 08.01.2018.
 */
import * as React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleManualSetup, setupShipRandom } from 'actions/game';
import { State, Dispatch } from 'types';

import ButtonList from '../components/ButtonList';

const mapStateToProps = (state: State) => {
    return {
        gameState: state.game.gameState,
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators({
        toggleManualSetup,
        setupShipRandom,
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ButtonList);
