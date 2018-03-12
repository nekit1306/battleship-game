import React from 'react';
import PropTypes from 'prop-types';

const Footer = ({type, size, orientation}) => {
    return (
        <div className={`ship-box ship-box-size-${size} ship-box-${type} ship-${orientation}`}></div>
    );
};

export default Footer;