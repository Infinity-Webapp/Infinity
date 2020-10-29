// loading environment variables
if(process.env.NODE_ENV != 'production'){
    require('dotenv').config;
}

// node.js modules imports
    const express = require("express");
    const app = express();
    const passport = require('passport');
    const flash = require('express-flash');
    const session = require('express-session');
    const bcrypt = require('bcrypt');
    const methodOverride = require('method-override');
    const initLogin = require('./login-config');
    const port = 80;

//  initializing login system
initLogin(
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user.id === id)
);

// list of users --> just for testing | final app will save userdata in mongodb
var users = [];

// Serving static files
// app_name.use('url on which you have to serve static files', express.static('location of static files relative to express app'));
app.use('/css', express.static('static/common/css'));
app.use('/script', express.static('static/common/script'));
app.use('/media', express.static('static/media'));
app.use('/global_chat', express.static('static/global_chat'));

// using dependencies
app.use(flash());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended: false}));

// setting the view engine
app.set('view-engine', 'ejs');

// routes
app.get('/', (req, res) => {
    res.status(200).sendFile('/static/index.html');
});

app.get('/homepage', (req, res) => {
    res.status(200).sendFile('/static/index.html');
});

app.get('/global-random_chat', (req, res) => {
    res.status(200).sendFile('/static/global_chat/global_chat.html');
});

// login system routing
app.get('/signin', checkNotAuthenticated, (req, res) => {
    res.status(200).render('/static/signin/signin.ejs')
});

app.post('/signin', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/signin',
    failureFlash: true,
}));

app.delete('/signout', (req, res) => {
    req.logOut();
    req.redirect('/');
});

// registration system routing
app.get('/signup', checkNotAuthenticated, (req, res) => {
    res.status(200).render('/static/signup/signup.ejs')
});

app.post('/signup', checkNotAuthenticated,async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const confirmHashedPassword = await bcrypt.hash(req.body.confirm_password, 10);
        users.push({
            email: req.body.email,
            password: hashedPassword,
        });console.log(users);
        res.redirect('/signin');
    } catch{
        res.redirect('/signup');
        console.log("some error occured, try again!!");
    }
});

// authentication checks
function checkAuthenticated(req, res, next){
    if(req.isAuthenticated()) return next();
    res.redirect('/');
}

function checkNotAuthenticated(req, res, next){
    if(req.isAuthenticated()) return res.redirect('/');
    next();
}

// listening at port 80
    app.listen(port, ()=>{
        console.log(`listening on port ${port}` )
    });