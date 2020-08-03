'use strict';

//? local test
// npm start

//? on/off production
//heroku ps:scale web=0
//heroku ps:scale web=1

const express = require('express');
const socketIO = require('socket.io');

const PORT = process.env.PORT || 3000;
const INDEX = '/index.html';

const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const io = socketIO(server);

var clients = [];

io.on('connection', (socket) => {
  console.log('Client connected');
  socket.on('disconnect', () => {
    console.log('Client disconnected');
    clients.splice(clients.indexOf(socket.client.id), 1);
    console.log(clients);
  });

  clients.push(socket.client.id);
  console.log(socket.client.id);

  io.emit('clients', socket.id, clients);
  console.log(clients);
});

var i = 0;

setInterval(() => {
  i += 1;
  io.emit('fast', i);
  //console.log("tik " + i)
}, 25);

setInterval(() => {
  io.emit('time', new Date().toTimeString(), i);
  //console.log("------- " + i)
}, 1000);