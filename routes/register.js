const router = require('express').Router();
const bcrypt = require('bcrypt-nodejs');
const mongoose = require('mongoose');
const User = mongoose.model('user');

router.post('/register', function(req, res, next){
    let password = bcrypt.hashSync(req.body.password);
    req.body.password = password;
    User.create(req.body, function(err, saved){
        if(err) {
            console.log(err);
            res.json({message : err});
        } else{
            res.json({message : "User Succesfully registerd!"});
        }
    });
});


module.exports = router;