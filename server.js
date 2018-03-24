const express = require('express');
const app = express();
const port = 8888;
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session')
const bc = require('./controllers/main'); //import for blockchain

//bodyparsers
app.use(bodyParser.urlencoded({
    extended: false
}));

//initalize cookies
app.use(cookieParser());
app.use(bodyParser());
app.use(cookieSession({
    name: 'session',
    keys: ['key1','key2']
}));

//set up front end, and scripts for jquery and blockchain
app.use('/view',express.static(path.join(__dirname + './view/')));
app.use('/controllers',express.static(path.join(__dirname +'/controllers')));

//start passport
app.use(passport.initialize());
app.use(passport.session());

/********
 * This will need to be moved, being left here for simplicity at the time
 * will need to use secret, and config file kept locally etcs
 * 
 */
let username = 'wes';
let password = 'admin';

let dbHost = '127.0.0.1';
let dbPort = '27017';
let database = 'first_db';

let url = 'mongodb://' + username + ':' + password + '@' + dbHost + ':' + dbPort + '/' + database; 

console.log('mongodb connection = ' + url);

mongoose.connect(url, function(err){
    if(err) { 
        console.log('connection error: ', err);
    } else { 
        console.log('connection successful');
    }
});
/***************
 */

//get model
require('./models/User');

let cChain = new bc.Blockchain();
app.locals.cChain = cChain; //set as local object within express app
console.log("block successfully started");

app.use(require('./routes'));

//handle 404 not found error
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

app.listen(port, '0.0.0.0', function(){
    console.log('Server running at port' + port);
})

module.exports = app;