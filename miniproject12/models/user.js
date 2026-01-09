const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/miniproject");

const userSchema = mongoose.Schema({
    username: String,
    name: String,
    age: Number,
    email: String,
    password: String,
    post: [{           //it consists the array of the objectId of post model
        type: mongoose.Schema.Types.ObjectId, 
        ref:"post"                      //it tells that it is connected with the post model
    }],
    profilepic:{
        type: String,
        default: "default.jpg"
    }
})

module.exports = mongoose.model('user', userSchema);