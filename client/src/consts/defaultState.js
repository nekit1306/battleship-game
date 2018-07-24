
// eslint-disable-next-line
export const LISTS = {
    opponentWaiting: false,
    shipPlacing: false,
    selectedShip: {
        id: null,
        size: 0
    },
    hits: {
        userBoard: [],
        opponentBoard: []
    },
    ships: [],
    cells: [],
    readyForBattle: false,
    gameOver: false,
    isWinner: null,
    currentTurn: null,
};

export const SOCKET = {
    socket: null
};
