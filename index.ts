const express = require('express');
const path = require('path')
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const apiPort = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  origin: true,
  credentials: true,
}))
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.send('Hello World!')
});

io.on('connection', (socket) => {
  console.log('a user connected');
});

app.use(express.static(path.resolve('./client/build')))

app.get('*', (req, res) => res.sendFile(path.resolve('client/build/index.html')));

http.listen(3000, () => {
  console.log('listening on *:3000');
});

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))