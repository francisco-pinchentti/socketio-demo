var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var messages = [{
    timestamp: new Date().getTime(),
    text: "Initial message",
    author: "API"
}];

app.use(express.static('public/sio-ui'));

// app.get('/hello', function (req, res) {
//     res.status(200).send("Hello World!");
// });

io.on('connection', function (socket) {
    console.log('New connection: sending all messages');
    socket.emit('messages', messages);

    socket.on('new-message', function (data) {
        messages.push(data);

        io.sockets.emit('messages', messages);
    });
});

server.listen(8080, function () {
    console.log("listening on http://localhost:8080");
});