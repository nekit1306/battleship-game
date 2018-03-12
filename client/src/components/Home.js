import React, { Component } from 'react';
import PlayBoard from '../containers/PlayBoard';
import Header from './Header';
import Footer from './Footer';

class Home extends Component {

    render() {
        return (
            <div className="home-page">
                <div className="container">
                    <Header />
                    <PlayBoard />
                    <Footer/>
                </div>
            </div>
        );
    }
}

export default Home;
