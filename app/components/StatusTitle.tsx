import * as React from 'react';
import {GameStatus} from "utils/constants";
import ButtonPlayAgain from "./Buttons/ButtonPlayAgain";

type Props = {
    currentTurn: boolean,
    gameState: number,
    winnerId: number,
    startNewGame: () => void
}

const StatusTitle = ({winnerId, gameState, currentTurn, startNewGame}: Props) => {
    let message = '';

    switch (gameState) {
        case GameStatus.DEFAULT:
            message = "Place all ships!";
            break;
        case GameStatus.WAITING:
            message = "Waiting for opponent...";
            break;
        case GameStatus.ABORTED:
            message = 'User has left!';
            break;
        case GameStatus.END:
            message = winnerId > 0 ? "Congrats! You have won." : "Oops! You have lost.";
            break;
        case GameStatus.STARTED:
            message = currentTurn ? "Your Turn" : "Opponent Turn";
            break;
        default:
            message = '';
    }

    return (
        <div className="col-md-8 offset-md-2 text-center">
            { message }
            { gameState === GameStatus.END &&
                <ButtonPlayAgain onStartNewGame={() => startNewGame()}/>
            }
        </div>
    );
};

export default StatusTitle;
