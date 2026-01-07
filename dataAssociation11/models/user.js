const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1/dataAsso"); 
//usually we write it in the config file(industry level)

const userSchema = mongoose.Schema({
    // username: String,   //we can also write it as 
    username: {
        type: String,
    },
    email: String,
    age: Number,
    posts: [                           //so post is a array which contains objectId 
        {
            type: mongoose.Schema.Types.ObjectId,   
            ref: 'post'   //and these id belongs to post model 
        }
    ]
})

module.exports = mongoose.model('user', userSchema);