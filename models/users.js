const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email:{
        type :String,
        required :true,
        unique : true
    },
    password: {
        type : String,
        required : true
    },
    name :{
        type:String,
        required: true
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

const User = mongoose.model('User',userSchema);
module.exports = User;