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
    let target = {key: cell, hit: false};

    for (let key in board) {
        if (board.hasOwnProperty(key)) {
            const position = board[key].pos;
            const size = board[key].size;
            const startPos = board[key].startPos;

            if (position.indexOf(cell) > -1) {
                const index = position.indexOf(cell);
                position.splice(index, 1);
                target.hit = true;

                if(position.length === 0) {
                    target.destroy = { id: key, size: size, startPos: startPos };
                }

                return target;
            }
        }
    }

    this.switchPlayer();

    return target;
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