import http from 'http';
import SocketIO from 'socket.io';
import app from './server';
import BattleshipGame from '../game';

const server = http.createServer(app);
const io = new SocketIO(server);

let waitingRoom = [];
let users = {};
let gameId = 0;


io.on('connection', socket => {
    socket.on('game_join', board => {

        const userObj = { socket: socket, board: board };

        waitingRoom.push(userObj);

        if (waitingRoom.length === 2) {

            const room = "inGame" + gameId++;
            const game = new BattleshipGame(room, waitingRoom[0], waitingRoom[1]);

            waitingRoom[0].socket.join(room);
            waitingRoom[1].socket.join(room);

            waitingRoom.forEach((userData, i) => {
                users[userData.socket.id] = {game: game, player: i};
            });

            waitingRoom = [];

            io.in(room).clients((err, clients) => {
                clients.forEach(socketId => {
                    io.to(socketId).emit('game_start', game.getCurrentTurn(users[socketId].player));
                })
            });
        }
    });

    socket.on('shoot', cell => {
        const game = users[socket.id].game;

        const hitCell = { key: cell, hit: false };

        if (game.checkShoot(cell)) {
            hitCell.hit = true;
        }

        io.to(socket.id).emit('hit', hitCell);
        socket.broadcast.to(game.room).emit('shot_take', hitCell);
    });

    socket.on('disconnect', () => {
        socket.emit('user_left');
    })

});

server.listen(3000, () => {
  console.log('Server listened on 3000 port');
});

