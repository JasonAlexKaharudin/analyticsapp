const express = require("express");
const session = require("express-session")
const body = require("body-parser")
const bcrypt = require('bcrypt')
const app = express(); 
const port = 3003;

const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;


var myUsers = [
    {id: 1, username: 'admin', password: 'admin', email: 'admin@example.com', role: 'ADMIN'},
    {id: 2, username: 'jason', password: 'jason', email: 'jason@example.com', role: 'BASIC'}
]

function findUser(username, func) {
    for (let user of myUsers) {
        if (user.username === username) {
            return func(null, user);
        }
    }
    return func(null,null);
}

// Sessioning

//determines which data of user object to store in session , in this case the username
passport.serializeUser(function(user, done) {
    done(null,user.username)
})

passport.deserializeUser(function(username, done){
    findUser(username, function(err, user){
        done(err, user);
    });
});

//check if username and password is valid
passport.use(new LocalStrategy({usernameField: 'username', 
                                passwordField: 'password'},
    function(username, password, done){
        findUser(username, function (err,user){
            if (err) {return done(err); }
            if (!user || user.password != password){
                return done(null, false, {
                    'message': 'User/password does not match'
                });
            }
            return done(null,user)
        });
    }
));

app.use(express.json());
app.use(session({
    secret: 'cat', 
    resave: false, 
    saveUninitialized: false
}));

app.use(body());
app.use(passport.initialize());
app.use(passport.session());

function ensureAuth(req, res, next) {
    if (req.isAuthenticated() ) {return next();}
    res.redirect('login');
}

// ROUTES

app.get('/login', function(req, res) {
    res.sendFile('public/login.html', {root:__dirname});
})
app.post('/login', passport.authenticate(
    'local', {successRedirect: 'home', failureRedirect: 'login'})
)

app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/login');
});

app.get('/home', ensureAuth, function(req, res){
    res.sendFile('public/home.html', {root: __dirname});
});

app.get('/reports', ensureAuth, function(req, res){
    res.sendFile('public/reports.html', {root: __dirname});
});


app.listen(port);