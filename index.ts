const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();
const socketIo = require('socket.io');
const http = require('https');
app.use(cors({
  credentials: true, 
  origin: true
}))

const server = http.createServer(app);
const io = socketIo(server)

const apiPort = process.env.PORT || 8000;
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static(__dirname + './../public'));
app.use(express.static(path.resolve('./client/build')))

app.use(bodyParser.json());

const connections = []
const reminderList = [];
io.on('connect', (socket) => {
  console.log('a user connected');
  socket.on('addReminder', addReminderData => {
    reminderList.push(addReminderData)
    io.emit('reminderAdded', addReminderData)
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
    socket.removeAllListeners();
 });
});


// app.get('*', (req, res) => res.sendFile(path.resolve('client/build/index.html')));

server.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))
