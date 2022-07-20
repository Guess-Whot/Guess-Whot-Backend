const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { randomUUID } = require('crypto');

app.use(
  cors({
    origin: [
      'http://localhost:7891',
      'https://transcendent-pithivier-7adb0e.netlify.app',
    ],

    credentials: true,
  })
);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    // origin: [
    //   'http://localhost:7891',
    //   'https://transcendent-pithivier-7adb0e.netlify.app',
    // ],
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS'],
  },
});

const rooms = {};

const joinRoom = (socket, room) => {
  room.sockets.push(socket);
  socket.join(room.id, () => {
    socket.roomId = room.id;
    console.log(socket.id, 'Joined', room.id);
  });
};

io.on('connection', (socket) => {
  // console.log(`User Connected: ${socket.id}`);

  socket.on('join_room', (roomId, callback) => {
    const room = rooms[roomId];
    joinRoom(room);
    callback();
  });

  socket.on('create_room', (roomName, callback) => {
    //front-end listener, takes lobbyName
    const room = {
      id: randomUUID(),
      name: roomName,
      sockets: [],
    };
    //gives room a unique id and name
    rooms[room.id] = room;
    //rooms is our list of rooms
    joinRoom(socket, room);
    callback({ status: 'good!' });
    // socket.email = data;
  });

  socket.on('get_roomnames', (data, callback) => {
    console.log(data, callback, 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE');
    const roomNames = [
      { id: 1, name: 'beavis' },
      { id: 2, name: 'butthead' },
    ];
    for (const id in rooms) {
      const { name } = rooms[id];
      const room = { name, id };
      roomNames.push(room);
    }
    socket.to(data.room).emit('receive_rooms', data);

    callback(roomNames);
  });

  socket.on('send_message', (data) => {
    socket.to(data.room).emit('receive_message', data);
  });
  socket.on('flipped_card', (data) => {
    socket.to(data.room).emit('flipped_received', data);
  });
});

// Built in middleware
app.use(express.json());
app.use(cookieParser());

// App routes
app.use('/api/v1/users', require('./controllers/users'));
app.use('/api/v1/characters', require('./controllers/characters'));
// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = server;
