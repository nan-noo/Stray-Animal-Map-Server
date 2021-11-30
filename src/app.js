const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

const router = require('./routes');
const { errorHandler } = require('./lib/error-handler');

const { MODE, MONGO_URI} = process.env;

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


app.use('/api', router);

// use this to show image in node.js server to client(react)
app.use('/src/uploads', express.static('src/uploads'));

app.use(errorHandler);

module.exports = app;