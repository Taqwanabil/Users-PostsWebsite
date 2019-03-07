const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    fname: {
        type: String,
        //required: true
    },
    lname: {
        type: String,
        //required: true
    },
    age: {
        type: Number,
        //required: true
    },
    email: {
        type: String,
       // required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
})


module.exports = mongoose.model('User', userSchema); //alaias for collection 
