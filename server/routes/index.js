import http from 'http';
import app from './server';
import SocketIO from 'socket.io';

const server = http.createServer(app);
const io = new SocketIO(server);

let waitingRoom = [];

io.on('connection', (socket) => {
    socket.on('USER_JOIN', () => {
        waitingRoom.push(socket);

        if (waitingRoom.length === 2) {
            waitingRoom[0].join('game_room');
            waitingRoom[1].join('game_room');

            waitingRoom = [];

            io.in('game_room').clients((err, clients) => {
                clients.forEach(socketId => {
                    io.to(socketId).emit('GAME_START', socket.id !== socketId)
                })
            });
        }
    })
});

server.listen(3000, () => {
  console.log('Server listened on 3000 port');
});

