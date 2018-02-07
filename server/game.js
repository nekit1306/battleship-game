function BattleshipGame(room, user, opponent) {
    this.players = [new Players(user), new Players(opponent)];
    this.room = room;
    this.currrentPlayer = Math.round(Math.random());
}


BattleshipGame.prototype.getCurrentTurn = function(player) {
    return player === this.currrentPlayer;
};

BattleshipGame.prototype.checkShoot = function(cell) {
    const board = this.getOpponentBoard();

    for (let key in board) {
        if (board.hasOwnProperty(key)) {
            console.log(board[key]);
            if (board[key].indexOf(cell) > -1) {
                console.log(cell, "founbd");
                return true;
            }
        }
    }

    this.switchPlayer();

    return false;
};

BattleshipGame.prototype.getOpponentBoard = function () {
    return this.currrentPlayer === 0 ?
        this.players[1].board : this.players[0].board;
};

BattleshipGame.prototype.switchPlayer = function() {
    this.currrentPlayer = this.currrentPlayer === 0 ? 1 : 0;
};

// Players Object

function Players(player) {
    this.board = player.board;
}



module.exports = BattleshipGame;