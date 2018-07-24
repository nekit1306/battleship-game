import { connect } from 'react-redux';
import Header from '../components/Header';

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
        readyForBattle : state.game.readyForBattle,
        opponentWaiting: state.game.opponentWaiting,
        currentTurn    : state.game.currentTurn,
        gameOver       : state.game.gameOver,
        isWinner       : state.game.isWinner
    };
};



/*
 Here we are creating a Higher order component
 https://facebook.github.io/react/docs/higher-order-components.html
 */
export default connect(mapStateToProps, null)(Header);
