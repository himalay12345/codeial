const mongoose = require('mongoose');

const messageSchema =  new mongoose.Schema({
    message:{
             type:String,
              required:true 

    },
   
    reciever:{
             type:mongoose.Schema.Types.ObjectId, 
             ref:'User'
        },

    sender: { 
        type:mongoose.Schema.Types.ObjectId,
         ref:'User', 
         required:true 
        },

    read: { 
        type:Date 
    }
},
{
    timestamps: true
}
);

const Message = mongoose.model('Message',messageSchema);
module.exports = Message;