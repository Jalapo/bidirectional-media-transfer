const express = require('express');
const App = express();
const http = require('http').createServer(App); // create http server with Express defined routes
const {Server} = require('socket.io');
const io = new Server(http);
const PORT = 9000;


// Listen on PORT(9000) with 'http'
http.listen(PORT, '0.0.0.0', (err)=>{
    if (err) throw err;
    console.log(`bidirectional-media-transfer: Listening on port ${PORT}`);
});

// Serve static files
App.use(express.static(`${__dirname}/../mobile`));
App.use("/server", express.static(`${__dirname}/gui`));

// Handle GET requests on '/' route
// send index.html webpage in response


io.on('connection', (socket)=>{
    console.log(`Connected: ${socket.conn.remoteAddress}`);
    socket.emit("logMessage", "Connected to server");
    socket.emit("connected");

    socket.on('disconnect', () => {
        console.log(`Disconnected: ${socket.conn.remoteAddress}`);
    });
});

// Handle GET requests on '/api' route
// return a '200' status code response with a body that reads 'Connection successful!'
App.get('/api', (req, res) => {
    console.log(`${req.ip}: 'GET' request`);
    res.status(200).send("Connection successful!");
});

App.post('/server/msg', express.text(), (req,res)=>{
    io.send(req.body);
    res.sendStatus(200);
});