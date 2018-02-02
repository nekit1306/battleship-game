function BattleshipGame(room, user, opponent) {
    this.players = [user, opponent];
    this.room = room;
}

BattleshipGame.prototype.getCurrentTurn = function () {
    return false;
};


module.exports = BattleshipGame;