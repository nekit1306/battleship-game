/**
 * Created by Kasutaja on 08.01.2018.
 */
import * as React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { setupShipManual } from 'actions/game';
import Board from '../components/Board';
import {GameState} from "types/game";
import {Dispatch} from "types";

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
        return (
            <Board onClick={(key) => this.handleCellClick(key)}
                   title={"My Board"}
                   {...this.props} />
        );
    };
}

const mapStateToProps = (state: GameState) => {
    return {
        selectedShip: state.game.selectedShip,
        ships       : state.game.ships,
        hits        : state.game.hits,
        title       : 'My Board'
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators({
        setupShipManual
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(UserBoard);

