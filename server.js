const express = require('express');
const userRouter = require('./routes/users');
const postRouter = require('./routes/posts');

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/dbname', () => {
    console.log('connected to mongodb');
})

const app = express()


var bodyParser = require('body-parser');
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/users', userRouter);
app.use('/posts', postRouter);


app.listen(4000, () => {
    console.log('started server on port 4000')
})

