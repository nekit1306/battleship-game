/**
 * Created by Kasutaja on 08.01.2018.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';

import ButtonList from '../components/ButtonList';

const ActionButtons = (props) => {
    return (
        <ButtonList {...props}></ButtonList>
    );
};

const mapStateToProps = (state) => {
    return {
        readyForBattle : state.game.readyForBattle,
        opponentWaiting: state.game.opponentWaiting,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setupShipRandom: () => {
            dispatch(setupShipManual())
        },
        toggleShipPlacing: () => {
            dispatch(toggleShipPlacing())
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ActionButtons);
