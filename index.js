const http = require("http");
const express = require("express");
const app = express();
const path = require("path");
const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
  socket.on('User-messege', (data) => {
    io.emit('messege', {
      user: data.user || "Anonymous",
      text: data.text
    });
  });
});

app.use(express.static(path.resolve('./public')));

app.get('/', (req, res) => {
  return res.sendFile(path.resolve('./public/index.html'));
});

server.listen(9000, () => {
  console.log('listening on :9000');
});
