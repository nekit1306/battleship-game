
export const USER_BOARD_INITIAL_STATE = {
    ships     : [],
    cells     : [],
    hit_points: [],
    destroyed : []
};

const OPPONENT_BOARD_INITIAL_STATE = {
    hit_points: [],
    destroyed : []
};

export const INITIAL_GAME_STATE = {
    userBoard      : USER_BOARD_INITIAL_STATE,
    opponentBoard  : OPPONENT_BOARD_INITIAL_STATE,
    selectedShip   : {},
    opponentWaiting: false,
    readyForBattle : false,
    gameOver       : false,
    isWinner       : null,
    currentTurn    : null
};

export const INITIAL_SOCKET_STATE = {
    socket: null
};
