const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');
const app = express();

dotenv.config({path: './config.env'});
require('./db/conn');


const PORT = process.env.PORT;


const middleware = (req, res, next) => {
    console.log('This is middleware');
    next();
}


app.get('/', (req, res) => {
    res.send('Hello world from server');
});

app.get('/signup', (req, res) => {
    res.send('Response from signup');
})

app.get('/signin', (req, res) => {
    res.send('Hello from signin');
})

app.listen(PORT, () => {
    console.log(`server is running at port no ${PORT}`)
})

console.log("testing");