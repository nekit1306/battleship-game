function BattleshipGame(room, user, opponent) {
    this.players = [new Players(user), new Players(opponent)];
    this.room = room;
    this.currrentPlayerId = Math.round(Math.random());
    this.winnerId = null;
}


BattleshipGame.prototype.isCurrentTurn = function(id) {
    return this.currrentPlayerId === id;
};

BattleshipGame.prototype.checkShoot = function(cell) {
    const board = this.getOpponentBoard();
    let target = {key: cell, hit: false};
    let destroyed = 0;

    for (let key in board) {
        if (board.hasOwnProperty(key)) {
            const position = board[key].pos;

            if (position.indexOf(cell) > -1) {
                const index = position.indexOf(cell);
                position.splice(index, 1);
                target.hit = true;

                if (position.length === 0) {
                    target.startPos = board[key].startPos;
                    target.destroyed = {
                        size: board[key].size,
                        orientation:  board[key].orientation
                    };

                    destroyed++;

                    if (destroyed === 10) {
                        this.winnerId = this.currrentPlayerId;
                    }
                }

                return target;
            }
        }
    }

    this.switchPlayer();

    return target;
};

BattleshipGame.prototype.getOpponentBoard = function () {
    return this.currrentPlayerId === 0 ?
        this.players[1].board : this.players[0].board;
};

BattleshipGame.prototype.checkWinner = function () {
    return this.winnerId;
};

BattleshipGame.prototype.isWinner = function (id) {
    return this.winnerId === id;
};

BattleshipGame.prototype.switchPlayer = function() {
    this.currrentPlayerId = this.currrentPlayerId === 0 ? 1 : 0;
};

// Players Object

function Players(player) {
    this.board = player.board;
}



module.exports = BattleshipGame;