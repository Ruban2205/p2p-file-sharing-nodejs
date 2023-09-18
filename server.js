const express = require("express"); 
const path = require('path'); 

const app = express(); 
const server = require('http').createServer(app);

const io = require('socket.io')(server); 

app.use(express.static(path.join(__dirname + "/public")));

io.on("connection", function (socket) {
    socket.on("sender-join", function (data) {
        socket.join(data.uid);
    });
    socket.on("reciever-join", function (data) {
        socket.join(data.uid);  
        socket.in(data.sender_uid).emit("init", data.uid);
    });
    socket.on("file-meta", function (data) {
        socket.in(data.uid).emit("fs-meta", data.metadata);
    });
});

server.listen(3000, () => {
    console.log("Server is running at PORT:3000");
});