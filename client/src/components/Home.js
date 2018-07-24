import React, { Component } from 'react';
import PlayBoard from '../containers/PlayBoard';
import Messenger from '../containers/Messenger';
import Header from '../containers/Header';
import Footer from './Footer';
import io from 'socket.io-client';

class Home extends Component {

    constructor(props) {
        super(props);

        const socket = io('http://localhost:3000');

        this.props.updateSocket(socket);
        this.props.loadInitialSockets(socket);
    }

    render() {
        return (
            <div className="home-page">
                <div className="container">
                    <Header />
                    <PlayBoard />
                    <Footer />
                    <Messenger/>
                </div>
            </div>
        );
    }
}

export default Home;
