import React, { Component } from 'react';
import PlayBoard from '../components/PlayBoard';
import Header from '../containers/HeaderContainer';
import Footer from './Footer';
import io from 'socket.io-client';
import {connect} from 'react-redux';
import StatusBar from '../containers/StatusBar';

class App extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const socket = io('http://localhost:3000');

        this.props.updateSocket(socket);
        this.props.loadInitialEvents(socket);
    }

    render() {
        return (
            <div className="home-page">
                <div className="container">
                    <Header />
                    <StatusBar/>
                    <PlayBoard />
                    <Footer />
                </div>
            </div>
        );
    }
}

export default App;

const mapStateToProps = (state) => {
    return {
        readyForBattle : state.game.readyForBattle,
        opponentWaiting: state.game.opponentWaiting,
        currentTurn    : state.game.currentTurn,
        gameOver       : state.game.gameOver,
        isWinner       : state.game.isWinner
    };
};

export default connect(mapStateToProps, null)(App);

