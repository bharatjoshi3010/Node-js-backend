const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    user:{                                          //it stores the id of the user who created it
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    date:{                             //stores the time of the creation
        type: Date,
        default: Date.now
    },
    content: String,             //stores the content
    likes: [                            //stores the name the id's of the user in a array format who created it
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "users"
        }
    ],
    
})

module.exports = mongoose.model('post', postSchema);