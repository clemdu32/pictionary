const express = require('express');
const mongoose = require('mongoose');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http,{ wsEngine: 'ws' });
const bodyParser = require('body-parser');
const port = 3001;

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser:true, useUnifiedTopology: true});
mongoose.connection.once('open', function(){
    console.log('Connection has been made, now make fireworks...');
}).on('error', function(error){
    console.log('Connection error:', error);
});

require('./api/userRoutes.js')(app, io);

require('./api/generalRoutes.js')(app);


http.listen(3001, function(){
    console.log(`LISTENING ON PORT ${port}`);
});