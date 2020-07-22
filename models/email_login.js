const mongoose = require('mongoose');
const emailSchema = new mongoose.Schema({
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
        required : true
    },
    verification:{
        type:String
    }
},
    {
        timestamps : true
    }
    
);

const EmailUser = mongoose.model('EmailUser',emailSchema);
module.exports = EmailUser;