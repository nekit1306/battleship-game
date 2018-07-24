/**
 * Created by Kasutaja on 15.04.2018.
 */
import React from 'react';

const Footer = () => {
    return (
        <div className="footer">
            <div className="float-left">Made with <i className="fas fa-heart"></i> by @nekit1306</div>

            <div className="share-buttons float-right">
                <a className="fab fa-google"></a>
                <a className="fab fa-facebook"></a>
                <a className="fab fa-twitter"></a>
            </div>
        </div>
    );
};

export default Footer;