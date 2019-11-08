import * as React from 'react';

interface Props {
    onClick: () => void
}

const ButtonHand = ({onClick}: Props) => (
    <div className="action-btn" onClick={() => onClick}>
        <i className="fas fa-hand-paper"></i>
    </div>
);

export default ButtonHand;
