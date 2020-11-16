import express from 'express';
import { Application } from 'express';
import cors from 'cors';
import http from 'http';
import path from 'path';
import { Socket } from 'socket.io';
import { People } from './types/index';

const socketIo = require('socket.io');
const app: Application = express();
const server = http.createServer(app);
const io = socketIo(server)
const apiPort = process.env.PORT || 8000;

app.use(cors({ credentials: true, origin: true }))
app.use(express.static(path.resolve('./client/build')))

const people: People = {}

io.on('connect', (socket: Socket) => {
  console.log('a user connected');

  socket.on('join', name => {
    people[socket.id] = name;
    io.emit('updateName', people)
  })

  socket.on('addReminder', addReminderData => {
    const data = {
      ...addReminderData,
      owner: people[socket.id]
    }
    
    console.log(data)
    io.emit('reminderAdded', data, people[socket.id])
  })

  socket.on('toggleReminder', toggleReminderData => {
    io.emit('toggleReminderReceived', toggleReminderData)
  })

  socket.on('editReminder', editReminderData => {
    io.emit('editReminderReceived', editReminderData)
  })

  socket.on('updateReminder', updateReminderData => {
    io.emit('updateReminderDataReceived', updateReminderData)
  })

  socket.on('deleteReminder', deleteReminderData => {
    io.emit('toggleDeleteReceived', deleteReminderData)
  })

  socket.on('disconnect', () => {
    delete people[socket.id]
    io.emit('updateName', people)
 });
});

server.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))
