import express, { Application } from 'express';
import { Socket, Server} from 'socket.io';
import socketio from 'socket.io';
import http from 'http';
import path from 'path';
import { People, Reminder } from './types/index';

const app: Application = express();
const server = http.createServer(app);
const io: Server = socketio(server)
const port = process.env.PORT || 8000;

app.use(express.static(path.resolve('./client/build')))

const people: People = {}

const currentTime = () => {
  const current = new Date(); 
  const h = String(current.getHours());
  let m = String(current.getMinutes()); 

  if(m.length < 2 ){
    m = `0${m}`;
  }

  return `${h}:${m}`;
}

io.on('connect', (socket: Socket) => {
  socket.on('join', (name: string)=> {
    people[socket.id] = name;
    io.emit('updateName', people)
  })

  socket.on('addReminder', (addReminderData: Reminder) => {
    const data: Reminder = {
      ...addReminderData,
      owner: people[socket.id],
      time: currentTime()
    }

    io.emit('reminderAdded', data)
  })

  socket.on('toggleReminder', (toggleReminderData: { id: string }) => {
    const data = {
      ...toggleReminderData,
      timeDone: currentTime()
    }
    io.emit('toggleReminderReceived', data)
  })

  socket.on('editReminder', (editReminderData: { edit: boolean, id: string }) => {
    io.emit('editReminderReceived', editReminderData)
  })

  socket.on('updateReminder', (updateReminderData: { cardid: string, cardtitle: string }) => {
    io.emit('updateReminderReceived', updateReminderData)
  })

  socket.on('deleteReminder', (deleteReminderData: { id: string }) => {
    io.emit('deleteReceived', deleteReminderData)
  })

  socket.on('disconnect', () => {
    delete people[socket.id]
    io.emit('updateName', people)
  });
});

server.listen(port, () => console.log(`Server running on port ${port}`))
