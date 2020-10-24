// node.js modules imports
    const express = require("express");
    const app = express();
    const bcrypt = require('bcrypt');
    const port = 80;
//users --> just for testing
var users = [];
// Serving static files
// app_name.use('url on which you have to serve static files', express.static('location of static files relative to express app'));
// <-- example --> app.use('/static', express.static('static'));
app.use('/css', express.static('static/common/css'));
app.use('/script', express.static('static/common/script'));
app.use('/media', express.static('static/media'));
app.use('/global_chat', express.static('static/global_chat'));
app.use(express.urlencoded({extended: false}));
app.set('view-engine', 'ejs');

// requests and responses
app.get('/', (req, res) => {
    res.status(200).sendFile('/static/index.html');
});

app.get('/homepage', (req, res) => {
    res.status(200).sendFile('/static/index.html');
});

app.get('/global-random_chat', (req, res) => {
    res.status(200).sendFile('/static/global_chat/global_chat.html');
});

app.get('/signin', (req, res) => {
    res.status(200).render('/static/signin/signin.ejs')
});

app.post('/signin', (req, res) => {
    
});

app.get('/signup', (req, res) => {
    res.status(200).render('/static/signup/signup.ejs')
});

app.post('/signup', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        users.push({
            id: Date.now.toString(),
            name: req.body.name,
            mail: req.body.mail,
            username: req.body.username,
            contact: req.body.contact,
            password: hashedPassword,
        });
        res.redirect('/signin');
    } catch{
        res.redirect('/signup');
        console.log("some error occured, try again!!");
    }console.log(users);
});
// listening at port 3000
    app.listen(port, ()=>{
        console.log(`listening on port ${port}` )
    });