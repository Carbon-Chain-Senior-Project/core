//this is the router base
//any new routes added will have to used here
//also serves for navigation requests

const router = require('express').Router();
const path = require('path');


/*****
may want to move all these down into a separate api folder
*/
router.use(require('./register'));
router.use(require('./login'));
router.use(require('./item'));
router.use(require('./blockchain'));


router.get('/', function(req, res, next){
    res.sendFile(path.join(__dirname + '/../view/index.html'));
    
});

router.get('/register', function(req, res, next){
    res.sendFile(path.join(__dirname + '/../view/register.html'));
});

router.get('/home', loggedIn, function(req, res, next) {
    res.sendFile(path.resolve('view/home.html'));
});

function loggedIn(req,res,next){
    if(req.user){
        next();
    } else {
        res.redirect('/');
    }
}
module.exports = router;