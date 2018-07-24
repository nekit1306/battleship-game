import { connect } from 'react-redux';
import { loadInitialSockets } from '../actions/gameActions';
import PlayBoard from '../components/PlayBoard';

/*
This is a redux specific function.
What is does is: It gets the state specified in here from the global redux state.
For example, here we are retrieving the list of items from the redux store.
Whenever this list changes, any component that is using this list of item will re-render.
 */
const mapStateToProps = state => ({
    shipPlacing: state.game.shipPlacing,
    currentTurn: state.game.currentTurn,
    hits       : state.game.hits,
    opponentWaiting: state.game.opponentWaiting,
    readyForBattle: state.game.readyForBattle
});

/*
This is a redux specific function.
http://redux.js.org/docs/api/bindActionCreators.html
 */
const mapDispatchToProps = dispatch => ({
    loadInitialSockets: (socket) => {
        dispatch(loadInitialSockets(socket));
    }
});


/*
Here we are creating a Higher order component
https://facebook.github.io/react/docs/higher-order-components.html
 */
export default connect(mapStateToProps, mapDispatchToProps)(PlayBoard);
