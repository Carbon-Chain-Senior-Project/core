//file containiing routes for blockchain

const router = require('express').Router();
const path = require('path');
const bc = require('./../controllers/main');

//how to import blockchain object
//not sure

router.post('/balance', function(req, res, next){
    //blockchain is an object in the app at this point
    console.log(req.body.account);
    let balance = req.app.locals.cChain.getBalanceOfAddress(req.body.account);
    console.log(balance);
    res.json({balance: balance}); 
});

router.post('/transaction', function(req, res, next){
    req.app.locals.cChain.createTransaction(new bc.Transaction(req.body.sender, req.body.recipent, req.body.amount));
    req.app.locals.cChain.minePendingTransactions("address1");
    res.json({message: "transaction posted successfully"});
})
module.exports = router;