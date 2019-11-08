import * as React from 'react';
import {GameStatus} from "utils/constants";
import ButtonHand from "./Buttons/ButtonHand";
import ButtonRandom from "./Buttons/ButtonRandom";

interface Props {
    setupShipRandom: () => void,
    toggleManualSetup: () => void,
    gameState: number;
}

const ButtonList = ({setupShipRandom, toggleManualSetup, gameState}: Props) => {
    if (gameState > GameStatus.STARTED) {
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
