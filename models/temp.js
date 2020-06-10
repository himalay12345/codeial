const mongoose = require('mongoose');

const tempSchema = new mongoose.Schema({
    content:{
        type:String
    }},
    {
        timestamps : true
    }
    
);

const Temp = mongoose.model('Temp',tempSchema);
module.exports = Temp;