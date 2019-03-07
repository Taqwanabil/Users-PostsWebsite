const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    userId: {type:mongoose.Schema.Types.ObjectId, ref:'user',required:true},
    title: {type:String},
    body:{type:String}
})

const post = mongoose.model('post', postSchema);  //alaias for collection 

module.exports = post;