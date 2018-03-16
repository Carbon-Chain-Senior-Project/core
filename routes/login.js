const router = require('express').Router();
const path  = require('path');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('user');
const bcrypt = require('bcrypt-nodejs');


router.get('/user', loggedIn, function(req,res,next){
    User.findById({ _id: req.user._id}, function(err, user){
        return res.json(user);
    })
});

router.get('/logout', function(req, res, next) {
    req.logout();
    res.redirect('/');
});

router.post('/login', passport.authenticate('local'),
    function(req,res) {
        res.redirect('/home');
});

function loggedIn(req,res,next){
    if(req.user){
        next();
    } else {
        res.redirect('/');
    }
}

//login authentication
passport.use(new LocalStrategy(
    function(username, password, done){
        User.findOne({username : username}, function(err, user){
            if(user !==  null) {
                var isPasswordCorrect = bcrypt.compareSync(password, user.password);
                if(isPasswordCorrect){
                    console.log("Username and password correct!");
                     return done(null, user);
                } else {
                    console.log("Password Incorrect");
                    return done (null, false);
                }
            } else {
                console.log("Username does not exist");
                return done(null, false);
            }
        });
    }
));

//serailize and deserailize passport authenticate
passport.serializeUser(function(user, done){
    done(null, user);
});

passport.deserializeUser(function(user, done){
    done(null, user);
});

module.exports = router;