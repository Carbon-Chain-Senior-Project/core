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

//local stategy and cookies here?

//get routes


//bodyparsers

app.use(bodyParser.urlencoded({
    extended: false
}));


app.use(cookieParser());
app.use(bodyParser());
app.use(cookieSession({
    name: 'session',
    keys: ['key1','key2']
}));

app.use('/view',express.static(path.join(__dirname + './view/')));
app.use('/controllers',express.static(path.join(__dirname +'/controllers')));

app.use(passport.initialize());
app.use(passport.session());

/********
 * This will need to be moved, being left here for simplicity at the time
 * will need to use secret, and config file kept locally etcs
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
 * end of that mess
 */
//require models
require('./models/User');
require('./models/item');


const bc = require('./controllers/main');

let cChain = new bc.Blockchain();
app.locals.cChain = cChain;
console.log("block successfully started");
//first is sender second is receiver

cChain.createTransaction(new bc.Transaction('address1','address2',100));
cChain.createTransaction(new bc.Transaction('address2','address1',50));

cChain.minePendingTransactions('address1');

console.log('\n poops balance is ' + cChain.getBalanceOfAddress('poopsaddress'));
console.log('going again');
cChain.minePendingTransactions('poopsaddress');
console.log('\n poops balance is ' + cChain.getBalanceOfAddress('address1'));

let  routes = require('./routes/');
app.use(routes);


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