import http from 'http';
import SocketIO from 'socket.io';
import app from './server';
import BattleshipGame from '../game';

const server = http.createServer(app);
const io = new SocketIO(server);

let waitingRoom = [];
let users = [];
let gameId = 0;


io.on('connection', (socket) => {
    socket.on('game_join', () => {
        waitingRoom.push(socket);

        if (waitingRoom.length === 2) {

            const room = "inGame" + gameId++;
            const game = new BattleshipGame(room, waitingRoom[0].id, waitingRoom[1].id);

            waitingRoom[0].join(room);
            waitingRoom[1].join(room);
            users[waitingRoom[0].id] = game;
            users[waitingRoom[1].id] = game;

            waitingRoom = [];

            io.in(room).clients((err, clients) => {
                clients.forEach(socketId => {
                    io.to(socketId).emit('game_start', game.getCurrentTurn(socketId));
                })
            });
        }
    });

    socket.on('shoot', cell => {
        const game = users[socket.id];

        const hitCell = {key: cell, hit: true};

        io.in(game.room).clients((err, clients) => {
            clients.forEach(socketId => {
                io.to(socketId).emit('hit', hitCell);
            })
        });
    });

    socket.on('disconnect', () => {
        socket.emit('user_left');
    })

});

server.listen(3000, () => {
  console.log('Server listened on 3000 port');
});

