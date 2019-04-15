import React, { Component } from 'react';
import PlayBoard from '../components/PlayBoard';
import Header from '../components/Common/Header';
import Footer from '../components/Common/Footer';
import io from 'socket.io-client';
import {connect} from 'react-redux';
import StatusBar from './StatusBar';
import {bindActionCreators} from 'redux';
import { loadInitialEvents } from '../actions/game';
import { updateSocket } from '../actions/sockets';

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
                    {/*<Footer />*/}
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        updateSocket,
        loadInitialEvents,
    }, dispatch);
};

export default connect(null, mapDispatchToProps)(App);

