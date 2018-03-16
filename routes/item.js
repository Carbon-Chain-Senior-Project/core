//routes for editing items, currently not usefull


const router = require('express').Router();
const path  = require('path');
const mongoose = require('mongoose');
const User = mongoose.model('user');
const Item = mongoose.model('item');

function loggedIn(req,res,next){
    if(req.user){
        next();
    } else {
        res.redirect('/');
    }
}

router.post('/add', function(req, res, next){
    var item = new Item();
    item.id = Math.round((new Date()).getTime() / 1000);
    item.details = req.body.details;
    item.isPublic = req.body.isPublic;
    item. post_time = getDateTime();
    item.owner = req.user.username;

    Item.create(item, function(err, saved){
        if(err) {
            console.log(err);
            res.json({ message: err});
        } else { 
            res.json({ message: "item successfully registered!", item:saved});
        }
    });
});

router.post('/edit', loggedIn, function(req,res,next){
    Item.findById({ _id: req.body._id}, function(err, item){
        if(err){
            console.log(err);
            return res.json({ message: err});
        } else {
            //new eidts here
            item.details = req.body.details;
            item.isPublic = req.body.isPublic;
            item.edit_time = getDateTime();

            item.save(function(err){
                if(err){
                    console.log(err);
                    return res.json({ message : err});
                } else { 
                    return res.json({ message: "Item successfully edited!"});
                }
            });
        }
    });
});

router.post('/delete', loggedIn, function(req,res,next){
    Item.findOneAndRemove({ _id: req.body._id}, function(err, item){
            if(err){
                console.log(err);
                return res.json({ message: err});
            } else {
                return res.json({ message: "Item successfully deleted!"});
            }
    });
});
router.get('/items', loggedIn, function(req, res, next){
    Item.find({ owner : req.user.username} , function(err, item) {
        return res.json(item);
    });
});

router.get('/items/public', function (req,res,next){
    Item.find({isPublic: "true"}, function(err, item){
        return res.json(item);
    });
});

function getDateTime(){
    var date =  new Date();
    
    var hour = date.getHours();
    hour = (hour < 10 ? "0": "") + hour;
    var min = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return year + ":" + month + ":" + day + " - " + hour + ":" + min + ":" + sec;

}

module.exports = router;