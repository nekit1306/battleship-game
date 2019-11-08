import * as React from 'react';

import {GameStatus} from "utils/constants";
import ButtonStart from "./Buttons/ButtonStart";

type Props = {
    ships: any[],
    gameState: number,
    currentTurn: boolean,
    onButtonClick: () => void
}

const Overlay = ({ships, gameState, currentTurn, onButtonClick}: Props) => {
    if (gameState < GameStatus.STARTED || !currentTurn) {
        return null;
    }
    return (
        <div className="board-overlay">
            <div className="search-game">
                { gameState === GameStatus.DEFAULT &&
                  <ButtonStart ships={ships} onButtonClick={() => onButtonClick}/>
                }
            </div>
        </div>
    )
};

export default Overlay;

