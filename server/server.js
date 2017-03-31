const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const env = process.env.NODE_ENV || 'development';
const config = require('../config')[env];
const socket = require('./controllers/socket');
const UserModel = require('./models/User');
const MessageModel = require('./models/Message');

app.use(express.static('public'));

// use morgan for logging errors
app.use(morgan('tiny'));

// set the port
app.set('port', (config.port));

mongoose.connect(config.mongo_url);
const db = mongoose.connection;

db.once('open', function(err) {
    if (err) {
        console.log('Database could not be opened: ' + err);
        return;
    }

    console.log('Database up and running...')
});

db.on('error', function(err){
    console.log('Database error: ' + err);
});
//models
UserModel.init();
MessageModel.init();

// export db connection so can be required in other files
exports.db = db;

// routes
const routes = require('./routes/routes.js');
routes(app);

//socket
socket(app);
