function BattleshipGame(room, user, opponent) {
    this.players = [user, opponent];
    this.room = room;
    this.turn = Math.round(Math.random());
}

BattleshipGame.prototype.getCurrentTurn = function (id) {
    return this.players[this.turn] === id;
};

BattleshipGame.prototype.checkShoot = function () {
    return false;
};


module.exports = BattleshipGame;