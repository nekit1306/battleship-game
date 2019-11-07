// @flow

import React from 'react';
import type {Ship} from "../../types/game";

type Props = {
    ships: Ship[],
    onButtonClick: () => void
}

const ButtonStart = ({ships, onButtonClick}: Props) => (
    <button className={"btn start-button " + (ships.length > 0 ? "btn-active" : "btn-disabled")}
            onClick={() => onButtonClick()}>Start game</button>
);

export default ButtonStart;