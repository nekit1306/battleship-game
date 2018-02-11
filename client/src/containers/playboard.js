import { connect } from 'react-redux';
import { loadInitialSockets } from '../actions/game_actions';
import PlayBoard from '../components/playboard';

/*
This is a redux specific function.
What is does is: It gets the state specified in here from the global redux state.
For example, here we are retrieving the list of items from the redux store.
Whenever this list changes, any component that is using this list of item will re-render.
 */
const mapStateToProps = state => ({
    shipPlacing: state.list.shipPlacing,
    currentTurn: state.list.currentTurn,
    hits       : state.list.hits,
    opponentWaiting: state.list.opponentWaiting,
    readyForBattle: state.list.readyForBattle
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
