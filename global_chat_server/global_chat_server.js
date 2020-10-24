const port = 8000;
const io = require('socket.io')(800);
const express = require('express');
const app = express();
let usernames = {};

app.get("/", (req, res) => {
    res.status(200).send("The server is running at port 800")
});

// structuere of the server
// ==> what to do when a client new connects
// ==> what to do when client has an update with update id
// ==> what to do when a client disconnects

io.on('connection', (socket) =>{
    socket.on('i_connected', username => {
        usernames[socket.id] = username;
        socket.broadcast.emit('user_connected', username);
    });

    socket.on('message_sent', message_data => {
        message_data.username = usernames[socket.id];
        socket.broadcast.emit('message_recieved', message_data);
    });

    socket.on('disconnect', () => {
        socket.broadcast.emit('user_disconnected', usernames[socket.id]);
        delete usernames[socket.id];
    });
});


app.listen(port, () => {
    console.log("listening at port 800");
});