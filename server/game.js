
class BattleshipGame  {
    constructor(room, user, opponent) {
        this.players = [new Player(user), new Player(opponent)];
        this.room = room;
        this.currrentPlayerId = Math.round(Math.random());
        this.winnerId = null;
    }

    isCurrentTurn(id) {
        return this.currrentPlayerId === id;
    };

    checkShoot(cell) {
        const opponent = this.currrentPlayerId === 0 ? 1 : 0;
        const board = this.getOpponentBoard();

        let target = {
            key: cell,
            destroyed: {},
            hit: false
        };

        board.forEach((item, key) => {
            if (board.hasOwnProperty(key)) {
                const position = board[key].pos;

                if (position.includes(cell)) {

                    position.splice(position.findIndex(cell), 1);
                    target.hit = true;

                    if (position.length === 0) {
                        target.destroyed = {
                            cellId     : board[key].startPos,
                            size       : board[key].size,
                            orientation: board[key].orientation
                        };
                    }

                    if (this.players[opponent].getShipsLeft() === 0) {
                        this.winnerId = this.currrentPlayerId;
                    }

                    return target;
                }
            }
        });

        this.switchPlayer();

        return target;
    };

    getOpponentBoard() {
        return this.currrentPlayerId === 0 ?
            this.players[1].board : this.players[0].board;
    };

    checkWinner() {
        return this.winnerId;
    };

    isWinner(id) {
        return this.winnerId === id;
    };

    switchPlayer() {
        this.currrentPlayerId = this.currrentPlayerId === 0 ? 1 : 0;
    };

}


// Players Object

class Player {
    constructor(player) {
        this.board = player.board;
    }

    getShipsLeft() {
        let shipCount = 0;

        this.board.forEach((item, key) => {
            if (this.board.hasOwnProperty(key)) {
                if (this.board[key].pos.length) {
                    shipCount++;
                }
            }
        });

        return shipCount;
    };
}

module.exports = BattleshipGame;