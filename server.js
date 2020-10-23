// node.js modules imports
    const express = require("express");
    const app = express();
    const http = require('http');
    const fs = require('fs');
    const url = '127.0.0.1';
    const port = 80;

// Serving static files
// app_name.use('url on which you have to serve static files', express.static('location of static files relative to express app'))
// <-- example --> app.use('/static', express.static('static'));
app.use('/css', express.static('/homepage/CSS'));
app.use('/script', express.static('/homepage/script'));
app.use('/Static', express.static('/homepage/Static'));

// Reading html files using fs
const indexHtml = fs.readFileSync('/index.html');

// Get requests
app.get('/', (req, res) => {
    res.status(200).sendFile('/index.html');
});

app.get('/homepage', (req, res) => {
    res.status(200).sendFile('/index.html');
});

app.get('/global-random_chat', (req, res) => {
    res.status(200).sendFile('/Server/global_chat/global_chat.html');
});

// listening at port 3000
    app.listen(port, ()=>{
        console.log(`listening on port ${port}` )
    });