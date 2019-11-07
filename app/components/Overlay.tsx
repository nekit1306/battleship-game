import React from 'react';
import {GAME_DEFAULT_STATE, GAME_START_STATE} from "../utils/constants";
import type {Ship} from "../types/game";
import ButtonStart from "./Buttons/ButtonStart";

type Props ={
    ships: Ship[],
    gameState: number,
    currentTurn: boolean,
    onButtonClick: () => void
}

const Overlay = ({ships, gameState, currentTurn, onButtonClick}: Props) => {
    if (gameState < GAME_START_STATE || !currentTurn) {
        return null;
    }
    return (
        <div className="board-overlay">
            <div className="search-game">
                { gameState === GAME_DEFAULT_STATE &&
                  <ButtonStart ships={ships} onButtonClick={() => onButtonClick}/>
                }
            </div>
        </div>
    )
};

export default Overlay;

