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
    // origin: 'http://localhost:7891',
    credentials: true,
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  // console.log(`User Connected: ${socket.id}`);

  socket.on('join_room', (data) => {
    socket.join(data);
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
