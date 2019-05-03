const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app); // create a plain vanilla http server

const WebSocket = require('ws');
const wss = new WebSocket.Server({
    server,      // piggybacking on the plain http server
    path: '/chat'   // listen on only one route, allowing express to listen on its custom routes
}); 

app.use(express.urlencoded({extended: true}));

// This is my "database"
const db = [
    "Welcome to the chat app!"
];

wss.on('connection', (socket) => {
    console.log('new connection!');
    socket.send(JSON.stringify(db));

    socket.on('message', (data) => {
        console.log(data);
        db.push(data);
        console.log(db);
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(data));
            }
        });
        // socket.send(data);
    })
});


// When GET request comes in,
// send back all the messages.
app.get('/api', (req, res) => {
    res.json(db);
});

// When POST request comes in,
// add message to array of messages.
app.post('/api', (req, res) => {
    // What do we do here?
    console.log(req.body.message);
    db.push(req.body.message);
    res.json({
        'message': req.body.message
    })
});

server.listen(3001, () => {
    console.log(`Server running`)
});