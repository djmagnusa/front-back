const mongoose = require('mongoose');
const express = require('express');
const app = express();

const DB = 'mongodb+srv://moxiehawk:@cluster0.yckuc.mongodb.net/moxiehawk-assignment?retryWrites=true&w=majority'

mongoose.connect(DB, {
    useNewUrlParser: true,
}).then(() =>{
    console.log('connection successful');
}).catch((err) => console.log('no connection'));


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

app.listen(3000, () => {
    console.log('server is running at port no 3000')
})

console.log("testing");