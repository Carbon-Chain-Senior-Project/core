//file containiing routes for blockchain

const router = require('express').Router();
const path = require('path');

//how to import blockchain object
//not sure

router.post('/balance', function(req, res, next){
    //blockchain is an object in the app at this point
    console.log(req.body.account);
    let balance = req.app.locals.cChain.getBalanceOfAddress(req.body.account);
    console.log(balance);
    res.json({balance: balance}); 
});

module.exports = router;