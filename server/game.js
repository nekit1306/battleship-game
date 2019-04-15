
class BattleshipGame  {
    constructor(room, userBoard, opponentBoard) {
        this.players          = [new Player(userBoard), new Player(opponentBoard)];
        this.room             = room;
        this.currrentPlayerId = Math.round(Math.random());
        this.winnerId         = null;
    }

    isCurrentTurn(id) {
        return this.currrentPlayerId === id;
    };

    checkShoot(target) {
        const opponent = this.getOpponentPlayer();

        opponent.pointsLeft.forEach((item, index) => {
            if (item.includes(target)) {
                opponent.setHitPoints(target, true);
                opponent.removePointFromBoard(index, target);

                if (opponent.pointsLeft[index].length === 0) {
                    opponent.setDestroyedPoints(index);
                }
                if (opponent.getShipsLeft() === 0) {
                    this.winnerId = this.currrentPlayerId;
                }
                return this.getOpponentPoints();
            }
        });

        opponent.setHitPoints(target, false);
        this.switchPlayer();

        return this.getOpponentPoints();
    };

    getOpponentPoints() {
        const opponentPlayer = this.getOpponentPlayer();

        return {
            hitPoints:  this.getOpponentPlayer().hitPoints,
            sunkPoints:  this.getOpponentPlayer().sunkPoints,
        }
    }

     getOpponentBoard() {
        return this.getOpponentPlayer().board;
    };

    getOpponentPlayer() {
        return this.currrentPlayerId === 0 ?
            this.players[1] : this.players[0];
    }

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
        this.sunkPoints = {};
        this.points = this.getShipPosition();
    }

    getShipsLeft() {
        let shipCount = 0;

        this.points.forEach((item, key) => {
            if (this.points.hasOwnProperty(key)) {
                if (this.board[key].pos.length) {
                    shipCount++;
                }
            }
        });

        return shipCount;
    };

    getShipPosition() {
        return Object.entries(this.board).map(val => val.pos);
    }

    setHitPoints(target, damaged) {
        this.hitPoints[target] = {
            id     : target,
            damaged: damaged
        };
    }

    removePointFromBoard(index, target) {
        this.pointsLeft[index].splice(this.pointsLeft[index].findIndex(target, 1));
    }

    setDestroyedPoints(key) {
        const firstValue = this.board[key].pos.find((val, i) => i === 0);

        this.sunkPoints[firstValue] = {
            id         : firstValue,
            size       : this.board[key].size,
            orientation: this.board[key].orientation
        }
    }
}

module.exports = BattleshipGame;