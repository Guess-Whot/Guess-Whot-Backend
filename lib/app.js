const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const cookieParser = require('cookie-parser');

app.use(
  cors({
    origin: 'http://localhost:7891',
    credentials: true,
  })
);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    // second cors function to use socket.io and the accompanying methods.
    credentials: true,
    methods: ['GET', 'POST'],
  },
});

//Note: Could we simply change the room data to mean the user ID? that way you could see a list of users with id and connect with each other directly instead of using a room variable.
io.on('connection', (socket) => {
  //.on listens to the function "join_room"
  socket.on('join_room', (data) => {
    socket.join(data);
  });

  socket.on('send_message', (data) => {
    //.on listens to the function "receive_message" coming from the io.emit in the front end and sequesters the incoming data.
    socket.to(data.room).emit('receive_message', data);
  });

  socket.on('flipped_card', (data) => {
    //same with flip card as with the previous .on a .room variable is added to know which private chat to send the data to.
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
