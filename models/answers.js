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
        type:String,
        required:true
    },
    user: {
        type : mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
},
    {
        timestamps : true
    }
    
);

const Answer = mongoose.model('Answer',answerSchema);
module.exports = Answer;