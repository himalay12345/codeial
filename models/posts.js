const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    topic:{
        type:String,
        required:true
    },
    user: {
        type : mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    answers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Answer'
        }
    ]
},
    {
        timestamps : true
    }
    
);

const Post = mongoose.model('Post',postSchema);
module.exports = Post;