import http from 'http';
import SocketIO from 'socket.io';
import app from './server';
import BattleshipGame from '../game';

const server = http.createServer(app);
const io = new SocketIO(server);

let waitingRoom = [];
let users = [];
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
                    io.to(socketId).emit('game_start', game.isCurrentTurn(users[socketId].player));
                })
            });
        }
    });

    socket.on('shoot', cell => {
        const game = users[socket.id].game;

        const target = game.checkShoot(cell);

        checkGameOver(game);

        io.to(socket.id).emit('hit', target);
        socket.broadcast.to(game.room).emit('shot_take', target);
    });

    socket.on('disconnect', () => {
        if (waitingRoom.length > 0 && waitingRoom[0].socket === socket) {
            waitingRoom = [];
        }

        if (users[socket.id]) {
            socket.broadcast.to(users[socket.id].game).emit('user_left');

        }
    })

});

function checkGameOver(game) {
    if (game.checkWinner()) {
        io.in(game.room).clients((err, clients) => {
            clients.forEach(socketId => {
                io.to(socketId).emit('game_over', game.isWinner(users[socketId].player));
            })
        });
    }
}

server.listen(3000, () => {
  console.log('Server listened on 3000 port');
});

