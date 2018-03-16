//also carried over can have use later
//but currently has no use for carbonchain

const mongoose = require('mongoose');
let User = mongoose.model('user');
let ItemSchema = new mongoose.Schema({
    id : Number,
    owner: String,
    details: String,
    post_time: String,
    edit_time:String,
    isPublic: Boolean
});

let Item = mongoose.model('item', ItemSchema);
