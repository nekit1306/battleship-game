/**
 * Created by Kasutaja on 14.01.2018.
 */
/**
 * Created by Kasutaja on 14.01.2018.
 */
import { connect } from 'react-redux';
import { setupShipManual, toggleShipPlacing } from '../actions/GameActions';
import UserBoard from '../components/UserBoard';

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
        selectedShip: state.list.selectedShip,
        ships       : state.list.ships
    };
};

const mapDispatchToProps = dispatch => ({
    setupShipManual: (ship) => {
        dispatch(setupShipManual(ship));
    },
    toggleShipPlacing: () => {
        dispatch(toggleShipPlacing());
    }
});


/*
 Here we are creating a Higher order component
 https://facebook.github.io/react/docs/higher-order-components.html
 */
export default connect(mapStateToProps, mapDispatchToProps)(UserBoard);
