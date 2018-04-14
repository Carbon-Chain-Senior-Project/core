const express = require('express');
const app = express();
const port = 8888;
const path = require('path');
const bodyParser = require('body-parser');
const bc = require('./controllers/main'); //import for blockchain

//bodyparsers
app.use(bodyParser.urlencoded({
    extended: false
}));

//set up front end, and scripts for jquery and blockchain
app.use('/view',express.static(path.join(__dirname + './view/')));
app.use('/controllers',express.static(path.join(__dirname +'/controllers')));

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