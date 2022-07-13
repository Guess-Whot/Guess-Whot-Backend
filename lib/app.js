const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:7891',
    methods: ['GET', 'POST'],
  },
});

server.listen(7890, () => {
  console.log('SERVER IS RUNNING');
});
// Built in middleware
app.use(express.json());

// App routes

// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
