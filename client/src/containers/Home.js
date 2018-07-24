/**
 * Created by Kasutaja on 14.01.2018.
 */

import { connect } from 'react-redux';
import Home from '../components/Home';

import { updateSocket, loadInitialSockets } from '../actions/socketActions'

/*
 This is a redux specific function.
 What is does is: It gets the state specified in here from the global redux state.
 For example, here we are retrieving the list of items from the redux store.
 Whenever this list changes, any component that is using this list of item will re-render.
 */
/*
 This is a redux specific function.
 http://redux.js.org/docs/api/bindActionCreators.html
 */
const mapStateToProps = (state) => {
    return {
        currentTurn    : state.game.currentTurn,
        readyForBattle : state.game.readyForBattle,
        opponentWaiting: state.game.opponentWaiting,
        isWinner       : state.game.isWinner,
        gameOver       : state.game.gameOver
    };
};
const mapDispatchToProps = dispatch => ({
    updateSocket: (socket) => {
        dispatch(updateSocket(socket));
    },
    loadInitialSockets: (socket) => {
        dispatch(loadInitialSockets(socket));
    }
});


/*
 Here we are creating a Higher order component
 https://facebook.github.io/react/docs/higher-order-components.html
 */
export default connect(mapStateToProps, mapDispatchToProps)(Home);
