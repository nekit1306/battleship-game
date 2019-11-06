import React from 'react';
import {
    GAME_ABORTED_STATE,
    GAME_DEFAULT_STATE,
    GAME_END_STATE,
    GAME_START_STATE,
    GAME_WAITING_STATE
} from "../utils/constants";
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
        case GAME_DEFAULT_STATE:
            message = "Place all ships!";
            break;
        case GAME_WAITING_STATE:
            message = "Waiting for opponent...";
            break;
        case GAME_ABORTED_STATE:
            message = 'User has left!';
            break;
        case GAME_END_STATE:
            message = winnerId > 0 ? "Congrats! You have won." : "Oops! You have lost.";
            break;
        case GAME_START_STATE:
            message = currentTurn ? "Your Turn" : "Opponent Turn";
            break;
        default:
            message = '';
    }

    return (
        <div className="col-md-8 offset-md-2 text-center">
            { message }
            { gameState === GAME_END_STATE &&
                <ButtonPlayAgain onStartNewGame={() => startNewGame()}/>
            }
        </div>
    );
};

export default StatusTitle;