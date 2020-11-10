const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();
const socketIo = require('socket.io');
const http = require('http');
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
// app.use(cors({
//   origin: 'http://127.0.0.1:3000',
//   credentials: true,
// }))


app.use(bodyParser.json());

const connections = []
const reminderList = [];
io.on('connect', (socket) => {
  console.log('a user connected');
  connections.push(socket)

  // socket.emit('initialReminder', reminderList)

  socket.on('addReminder', addReminderData => {
    // write mongoDB model here
    reminderList.push(addReminderData)

    io.emit('reminderAdded', addReminderData)
  })

  socket.on('disconnect', () => {
    socket.removeAllListeners();
 });

});


// app.get('*', (req, res) => res.sendFile(path.resolve('client/build/index.html')));

server.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))
