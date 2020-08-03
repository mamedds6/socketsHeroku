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

io.on('connection', (socket) => {
  console.log('Client connected');
  socket.on('disconnect', () => console.log('Client disconnected'));
});

setInterval(() => {
  io.emit('time', new Date().toTimeString());
  console.log("tick")
},10000);

var i = 0;

setInterval(() => {  
  i += 1;
  io.emit('fast', i)
  //console.log("tick")
},20);