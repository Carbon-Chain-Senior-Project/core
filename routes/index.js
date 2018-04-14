const router = require('express').Router();
const path = require('path');


/*
 * main router file
 * handles changing of pages itself, and includes other routes 
 * this will be left, just act as a main router file
 */

router.use(require('./blockchain'));

//landing page for connecting to server
router.get('/', function(req, res, next){
    res.sendFile(path.join(__dirname + '/../view/index.html'));
    
});

module.exports = router;