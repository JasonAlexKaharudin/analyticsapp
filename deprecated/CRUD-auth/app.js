const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const PORT = 5000;

const app = express()

// Database
const MONGO_USERNAME = 'jason';
const MONGO_PASSWORD = 'jason';
const MONGO_HOSTNAME = '127.0.0.1';
const MONGO_PORT = '27017';
const MONGO_DB = 'api-db';

const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;
mongoose.connect(url, {
	useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'));


const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String, 
        required: true
    },
    role: {
        type: String, 
        required: true
    }
});

const User = mongoose.model('User', UserSchema);

app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
})

// Middleware
app.use(express.static(__dirname + '/public'));
app.use(session({
    secret: "verygoodsecret",
    resave: false, 
    saveUninitialized: true
}));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        done(err,user)
    });
});

passport.use(new localStrategy({usernameField: 'username',
                                passwordField: 'password'},
    function (username, password, done) {
	User.findOne({ username: username }, function (err, user) {
		if (err) return done(err);
		if (!user) return done(null, false, { message: 'Incorrect username.' });

		bcrypt.compare(password, user.password, function (err, res) {
			if (err) return done(err);
			if (res === false) return done(null, false, { message: 'Incorrect password.' });
			
			return done(null, user);
		});
	});
}));

function ensureAuth(req, res, next){
    if (req.isAuthenticated()) return next();
    res.redirect('/login')
}

function ensureAdmin(req, res, next) {
    if (req.user && req.user.role == 'Admin') return next();
    res.redirect('/login')
}


//ROUTES
app.get('/login', function(req, res) {
    res.sendFile('templates/login.html', {root:__dirname});
})

app.post('/login', passport.authenticate(
    'local', {successRedirect: '/home', failureRedirect: '/login'})
)

app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/login');
});

app.get('/home', ensureAuth, function(req, res){
    res.sendFile('templates/home.html', {root: __dirname});
});

app.get('/reports', ensureAuth, function(req, res){
    res.sendFile('templates/reports.html', {root: __dirname});
});


// get all the users in User collection
app.get('/getUsers', async (req, res) => {
    try{
        const users = await(User.find())
        res.json(users)
    } catch(err){
        res.status(500).json({message: err.message})
    }
});

// generate CRUD table for admins - must change to only accessiuble by ROLE: admin
app.get('/users' , ensureAdmin, (req, res) => {
    res.sendFile('templates/users.html', {root: __dirname});
})









//add admin account
app.get('/setAdmin', (req, res) => {
    const pw = 'password';
    bcrypt.genSalt(10, function(err, salt){
        bcrypt.hash(pw, salt, function(err, hash){
            if (err) return next(err);
            
            // Create a new Admin user
            const newAdmin = new User({
				username: "admin",
				password: hash,
                role: "Admin"
			});

            newAdmin.save();
        });
    })
    res.sendFile('templates/login.html', {root:__dirname})
})

app.get('/setBasic', (req, res) => {
    const pw = 'pass';
    bcrypt.genSalt(10, function(err, salt){
        bcrypt.hash(pw, salt, function(err, hash){
            if (err) return next(err);
            
            // Create a new Admin user
            const newUser = new User({
				username: "Jason",
				password: hash,
                role: "Basic"
			});

            newUser.save();
        });
    })
    res.sendFile('templates/login.html', {root:__dirname})
})