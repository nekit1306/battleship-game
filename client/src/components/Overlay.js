
import React from 'react';

const Overlay = (props) => {
    return (
        <div className="board-overlay">
            <div className="search-game">
                { !props.currentTurn && !props.opponentWaiting &&
                    <div>
                        <button className={"btn start-button " + (Object.keys(props.ships).length > 0 ? "btn-active" : "btn-disabled")}
                                onClick={() => props.onButtonClick()}>Start game</button>
                    </div>
                }
            </div>
        </div>
    )
};

export default Overlay;

