// @flow

import React from 'react';

type Props = {
    onClick: () => void
}

const ButtonRandom = ({onClick}: Props) =>(
    <div className="action-btn" onClick={() => onClick}>
        <i className="fas fa-hand-paper"></i>
    </div>
);

export default ButtonRandom;