
class BattleshipGame  {
    constructor(room, userBoard, opponentBoard) {
        this.players = [new Player(userBoard), new Player(opponentBoard)];
        this.room = room;
        this.currrentPlayerId = Math.round(Math.random());
        this.winnerId = null;
    }

    isCurrentTurn(id) {
        return this.currrentPlayerId === id;
    };

    checkShoot(target) {
        const opponent = this.currrentPlayerId === 0 ? 1 : 0;
        const board = this.getOpponentBoard();

        board.forEach((item, key) => {
            if (board.hasOwnProperty(key)) {
                const position = board[key].pos;

                if (position.includes(target)) {
                    this.players[opponent].setHitPoints(target, true);
                    this.players[opponent].removePointFromBoard(key, target);

                    if (this.getOpponentBoard()[key].pos.length === 0) {
                        this.players[opponent].setDestroyedPoints(key);
                    }

                    if (this.players[opponent].getShipsLeft() === 0) {
                        this.winnerId = this.currrentPlayerId;
                    }

                    return this.getOpponentPoints();
                }
            }
        });

        this.players[opponent].setHitPoints(target, false);

        this.switchPlayer();

        return this.getOpponentPoints();
    };

    getOpponentPoints() {
        const opponent = this.currrentPlayerId === 0 ? 1 : 0;

        return {
            hitPoints: this.players[opponent].getHitPoints(),
            destroyed: this.players[opponent].getDestroyedPoints(),
        }
    }

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
    constructor(board) {
        this.board = board;
        this.hitPoints = {};
        this.destroyed = {};
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

    getDestroyedPoints() {
        return this.destroyed;
    }

    getHitPoints() {
        return this.hitPoints;
    }

    setHitPoints(target, isDamaged) {
        this.hitPoints[target] = {
            id     : target,
            damaged: isDamaged
        };
    }

    removePointFromBoard(key, target) {
        const boardPosition = this.board[key].pos;

        boardPosition.splice(boardPosition.findIndex(target, 1));
    }

    setDestroyedPoints(key) {
        this.destroyed[key] = {
            id         : key,
            size       : this.board[key].size,
            orientation: this.board[key].orientation
        }
    }
}

module.exports = BattleshipGame;