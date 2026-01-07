const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    postdata : String,
    user: {                       //this id is of type objectId
        type: mongoose.Schema.Types.ObjectId, 
        ref: "user"                 //it comes from user model
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('post', postSchema);