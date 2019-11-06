// @flow

import React from 'react';
import {GAME_START_STATE} from "../utils/constants";
import ButtonHand from "./Buttons/ButtonHand";
import ButtonRandom from "./Buttons/ButtonRandom";

type Props = {
    setupShipRandom: () => void,
    toggleManualSetup: () => void,
    gameState: number;
}

const ButtonList = ({setupShipRandom, toggleManualSetup, gameState}: Props) => {
    if (gameState > GAME_START_STATE) {
        return null;
    }
    return (
        <div className="action-sidenav">
            <ButtonHand onClick={() => toggleManualSetup()}/>
            <ButtonRandom onClick={() => setupShipRandom()}/>
        </div>
    )
};

export default ButtonList;