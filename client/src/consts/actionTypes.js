// eslint-disable-next-line
export const GAME_ACTIONS = {
    SHIP_CLEAR: 'SHIP_CLEAR',
    BATTLE_READY: 'BATTLE_READY',
    SHIP_SELECT: 'SHIP_SELECT',
    SHIP_SETUP_MANUAL: 'SHIP_SETUP_MANUAL',
    SHIP_SETUP_RANDOM: 'SHIP_SETUP_RANDOM',
    OPPONENT_WAITING: 'OPPONENT_WAITING',
    GAME_START: 'GAME_START',
    GAME_OVER: 'GAME_OVER',
    GAME_RESET: 'GAME_RESET',
    CELL_HIT: 'CELL_HIT',
    SHOT_TAKE: 'SHOT_TAKE'
};

export const SOCKET_ACTIONS = {
    SOCKET_UPDATE: 'SOCKET_UPDATE',
};

export const SOCKET_EVENTS = {
    GAME_START: 'game_start',
    GAME_JOIN: 'game_join',
    GAME_OVER: 'game_over',
    USER_LEFT: 'user_left',
    SHOOT: 'shoot',
    HIT: 'hit',
    SHOT_TAKE: 'shot_take'
};


