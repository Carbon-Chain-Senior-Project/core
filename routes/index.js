const router = require('express').Router();
const path = require('path');


/*
 * main router file
 * handles changing of pages itself, and includes other routes 
 */
router.use(require('./register'));
router.use(require('./login'));
router.use(require('./blockchain'));

//landing page for connecting to server
router.get('/', function(req, res, next){
    res.sendFile(path.join(__dirname + '/../view/index.html'));
    
});

//gets page for registration
router.get('/register', function(req, res, next){
    res.sendFile(path.join(__dirname + '/../view/register.html'));
});

//gets homepage after login
router.get('/home', loggedIn, function(req, res, next) {
    res.sendFile(path.resolve('view/home.html'));
});

//callback function to check if a user is loggedin
function loggedIn(req,res,next){
    if(req.user){
        next();
    } else {
        res.redirect('/');
    }
}
module.exports = router;