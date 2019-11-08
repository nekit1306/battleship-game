import * as React from 'react';

interface Props {
    ships: any[],
    onButtonClick: () => void
}

const ButtonStart = ({ships, onButtonClick}: Props) => (
    <button className={"btn start-button " + (ships.length > 0 ? "btn-active" : "btn-disabled")}
            onClick={() => onButtonClick()}>Start game</button>
);

export default ButtonStart;
