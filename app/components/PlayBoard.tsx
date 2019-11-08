import * as React from 'react';
import UserBoard from "../containers/UserBoard";
import OpponentBoard from "../containers/OpponentBoard"
import ActionButtons from "../containers/ActionButtons"

const PlayBoard = () => {
    return (
        <div className="playing-area">
            <div className="field-clearfix">
                <ActionButtons/>
                <UserBoard />
                <OpponentBoard />
            </div>
        </div>
    );
};

export default PlayBoard;
