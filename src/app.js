const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

const { MODE, MONGO_URI} = process.env;

const userRouter = require('./routes/users');
const postRouter = require('./routes/posts');
const commentRouter = require('./routes/comments');

const app = express();
app.use(express.json());
app.use(morgan(MODE !== 'prod' ? 'dev' : 'combined'));
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));

mongoose.connect( MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => console.log('MongoDB connected...'))
    .catch( err => console.log(err));

//router
app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);
app.use('/api/comments', commentRouter);

// use this to show image in node.js server to client(react)
app.use('/src/uploads', express.static('src/uploads'));

module.exports = app;