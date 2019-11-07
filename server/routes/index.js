import http from 'http';
import SocketIO from 'socket.io';
import app from './server';
import BattleshipGame from '../game';

const server = http.createServer(app);
const io     = new SocketIO(server);

let waitingRoom = [];
let users       = [];
let gameId      = 0;


io.on('connection', socket => {
    socket.on('game_join', board => {
        const userObj = { socket: socket, board: board };

        waitingRoom.push(userObj);

        if (waitingRoom.length === 2) {
            const room = "inGame" + gameId++;
            const game = new BattleshipGame(room, waitingRoom[0].board, waitingRoom[1].board);

            waitingRoom[0].socket.join(room);
            waitingRoom[1].socket.join(room);

            waitingRoom.forEach((data, index) => {
                users[data.socket.id] = {
                    game  : game,
                    player: index
                };
            });

            waitingRoom = [];

            io.in(room).clients((err, clients) => {
                clients.forEach(socketId => {
                    io.to(socketId).emit('game_start', {
                        currentTurn: game.isCurrentTurn(users[socketId].player)
                    });
                })
            });
        }
    });

    socket.on('user_cell_hit', cell => {
        const game   = users[socket.id].game;
        const target = game.getTarget(cell);

        io.to(socket.id).emit('user_hit', {
            response   : target,
            currentTurn: game.isCurrentTurn(users[socket.id].player)
        });

        socket.broadcast.to(game.room).emit('user_take_shoot', {
            response   : target.hits,
            currentTurn: !game.isCurrentTurn(users[socket.id].player)
        });

        if (!game.checkWinner()) {
            io.in(game.room).clients((err, clients) => {
                clients.forEach(socketId => {
                    io.to(socketId).emit('game_over', {
                        winnerId : game.isWinner(users[socketId].player),
                    });
                    delete users[socketId];
                })
            });
        }
    });

    socket.on('disconnect', () => {
        if (waitingRoom.length > 0 && waitingRoom[0].socket === socket) {
            waitingRoom = [];
        }

        if (users[socket.id]) {
            const game = users[socket.id].game;

            socket.broadcast.to(game.room).emit('user_left');

            io.in(game.room).clients((err, clients) => {
                clients.forEach(socketId => {
                    delete users[socketId];
                })
            });
        }
    })

});

server.listen(3000, () => {
  console.log('Server listened on 3000 port');
});

