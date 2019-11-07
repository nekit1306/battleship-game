import React from "react";

type Props = {
    onStartNewGame: () => void;
}

const ButtonPlayAgain = ({onStartNewGame}: Props) => {
    return (
        <a className="repeat-link" onClick={() => onStartNewGame()}>
            Play again.
            <i className="fas fa-redo"></i>
        </a>
    )
};

export default ButtonPlayAgain;