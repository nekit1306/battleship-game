/**
 * Created by Kasutaja on 15.04.2018.
 */
import React from 'react';

const ButtonRandom = (props) =>(
    <div className="action-btn" onClick={() => props.onClick}>
        <i className="fas fa-hand-paper"></i>
    </div>
);

export default ButtonRandom;