import * as React from 'react';
import { Component } from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import io from 'socket.io-client';
import PlayBoard from '../components/PlayBoard';
import Header from '../components/Common/Header';
import Footer from '../components/Common/Footer';
import StatusBar from './StatusBar';
import { loadInitialEvents } from 'actions/game';
import { updateSocket } from 'actions/sockets';
import  {Dispatch} from "types";

type Props = {
    updateSocket: (socket: any) => void,
    loadInitialEvents: (socket: any) => void
}

class App extends Component<Props> {
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

const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators({
        updateSocket,
        loadInitialEvents,
    }, dispatch);
};

export default connect(null, mapDispatchToProps)(App);

