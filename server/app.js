const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const cookieparser = require("cookie-parser");

dotenv.config({path: './config.env'});
require('./db/conn');

app.use(cookieparser());
app.use(express.json());


//linking router files to make our route
app.use(require('./router/auth'));


const PORT = process.env.PORT;


// const middleware = (req, res, next) => {
//     console.log('This is middleware');
//     next();
// }


// app.get('/', (req, res) => {
//     res.send('Hello world from server');
// });

app.get('/signup', (req, res) => {
    res.send('Response from signup');
})

// app.get('/signin', (req, res) => {
//     res.send('Hello from signin');
// })

app.listen(PORT, () => {
    console.log(`server is running at port ${PORT}`)
})
