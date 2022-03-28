const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//create express app
const app = express();

// Database
const MONGO_USERNAME = 'jason';
const MONGO_PASSWORD = 'jason';
const MONGO_HOSTNAME = '127.0.0.1';
const MONGO_PORT = '27017';
const MONGO_DB = 'agile-db';

const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;

const db = mongoose.connection;
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'));

// Middleware
app.use(bodyParser.json());


// Routes
app.get('/', (req,res) => {
    res.send("hello, world")
})


//start the server on port 3000
app.listen(3000, console.log("listening on port 3000"));

