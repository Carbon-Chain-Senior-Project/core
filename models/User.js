//this is model for a user account


const mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

var User = mongoose.model('user', UserSchema);