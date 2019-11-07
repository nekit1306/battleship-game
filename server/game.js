class BattleshipGame  {
    constructor(room, userBoard, opponentBoard) {
        this.players          = [new Player(userBoard), new Player(opponentBoard)];
        this.room             = room;
        this.currrentPlayerId = Math.round(Math.random());
    }

    isCurrentTurn(id) {
        return this.currrentPlayerId === id;
    };

    getTarget(key) {
        const points      = this.getOpponentPoints();
        const hits        = this.getOpponentHits();
        const sunkenShips = this.getOpponentSunkenShips();

        const position = points.find(it => it.includes(key));

        if (position) {
            const index = position.findIndex(it => it === key);
            position.splice(index, 1);

            if (!position.length) {
                const ship = this.getOpponentShip(key);

                sunkenShips.push({
                    id         : ship.id,
                    size       : ship.size,
                    orientation: ship.orientation
                });

                hits.push({
                    id    : key,
                    status: 3
                });

                const target = hits.find(it => it.id === ship.id);
                target.status = 3;

            } else {
                hits.push({
                    id    : key,
                    status: 2,
                });
            }
        } else {
            hits.push({
                id  : key,
                status: 1,

            });
            this.switchPlayer();
        }

        return {
            hits : hits,
            ships: sunkenShips
        };
    };

    getOpponentPoints() {
        return this.currrentPlayerId === 0 ?
            this.players[1].points : this.players[0].points;
    }

    getOpponentHits() {
        return this.currrentPlayerId === 0 ?
            this.players[1].hits : this.players[0].hits;
    }

    getOpponentSunkenShips() {
        return this.currrentPlayerId === 0 ?
            this.players[1].sunkenShips : this.players[0].sunkenShips;
    }

    getOpponentShip(key) {
        const opponentBoard = this.currrentPlayerId === 0 ?
            this.players[1].board : this.players[0].board;

        return opponentBoard.find(it => it.position.includes(key));
    }

    checkWinner() {
        const opponent = this.currrentPlayerId === 0 ?
            this.players[1] : this.players[0];

        return opponent.hasAvailableShips();
    };

    isWinner(id) {
        return this.currrentPlayerId === id ? 1 : 0;
    };

    switchPlayer() {
        this.currrentPlayerId = this.currrentPlayerId === 0 ? 1 : 0;
    };
}


// Players Object
class Player {
    constructor(board) {
        this.board       = board;
        this.points      = this.getShipPosition();
        this.hits        = [];
        this.sunkenShips = [];
    }

    getShipPosition() {
        return this.board.map(a => [...a.position]);
    }

    hasAvailableShips() {
        return this.points.filter(it => it.length > 0).length > 0;
    }
}

export default BattleshipGame;
