const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    topic:{
        type:String,
        required:true
    },
    question:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post'
    }
    ,
    user: {
        type : mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    likes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Like'
        }
    ]
},
    {
        timestamps : true
    }
    
);

const Answer = mongoose.model('Answer',answerSchema);
module.exports = Answer;