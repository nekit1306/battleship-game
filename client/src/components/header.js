import React from 'react';
import logo from '../../res/images/ship-white.png';

const Header = () => (
    <div className="l-header">
        <div className="left">
            <span className="fa fa-sign-in"></span>
        </div>
        <div className="logo">
            <img className="logo-icon" src={logo}/>
        </div>
        <div className="right">
        </div>
    </div>
);

export default Header;
