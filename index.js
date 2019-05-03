const express = require('express');
const app = express();

app.use(express.urlencoded({extended: true}));

// This is my "database"
const db = [
    "Welcome to the chat app!"
];

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

app.listen(3001, () => {
    console.log(`Server running`)
});