const router = require('express').Router();
const path = require('path');
const bc = require('./../controllers/main'); //import class for bc functions

/* file containiing routes for blockchain
 * handles all updates to blockchain object, running on the main server file
 */

 //returns balance of an address
router.post('/balance', function(req, res, next){
    console.log(req);
    let balance = req.app.locals.cChain.getBalanceOfAddress(req.body.account);
    console.log(req.body.account + " has a balance of " + balance);
    res.json({balance: balance}); 
});

//adds a new transaction to the blockchain
//at this point in the project, all transactions that come here are assumed to be valid
//if a sender does not have the balance to make a transaction, their balance simply becomes negative
router.post('/transaction', function(req, res, next){
    req.app.locals.cChain.createTransaction(new bc.Transaction(req.body.sender, req.body.recipent, req.body.amount));
    console.log(req.body.sender + " has sent " + req.body.amount + " to " + req.body.recipent);
    res.json({message: "transaction posted successfully"});
});

//addes a new proof of purchase to the current block
//withing the the addPOP method, a running amount of total pop is keep up to date
//if the totalpop exceeds the POP threshold (block diffculty) a new block will be made.
router.post('/pop', function(req, res, next){
    req.app.locals.cChain.addPOP(new bc.POP(req.body.customer, req.body.business, req.body.amount));
    console.log(req.body.customer + " has submitted a POP totalling " + req.body.amount + " at " + req.body.business);
    res.json({message : "pop posted successfully"});
});
module.exports = router;