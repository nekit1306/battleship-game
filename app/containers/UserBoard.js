/**
 * Created by Kasutaja on 08.01.2018.
 */
import React, { Component } from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { setupShipManual } from '../actions/game';
import Board from '../components/Board';
import type {GameState} from "../types/game";
import type {Dispatch} from "../types";

class UserBoard extends Component {
    handleCellClick = (props) => {
        // const { selectedShip, ships, setupShipManual } = this.props;
        // if (selectedShip.id !== null && !ships[selectedShip.id]) {
        //     const ship = {
        //         id  : selectedShip.id,
        //         size: selectedShip.size,
        //         key : props.key,
        //         x   : props.x,
        //         y   : props.y
        //     };
        //     setupShipManual(ship);
        // }
    };

    render() {
        const {hits, ships} = this.props;

        return (
            <Board onCellClick={(key) => this.handleCellClick(key)}
                   hits={hits}
                   ships={ships}
                   title={"My Board"} />
        );
    };
}

const mapStateToProps = (state: GameState) => {
    return {
        selectedShip: state.game.selectedShip,
        ships       : state.game.ships,
        hits        : state.game.hits
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators({
        setupShipManual
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(UserBoard);

