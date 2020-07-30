const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
    name:{
        type:String
    },
    image:{
        type:String
    },
    follower:[
        { 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Follower' 
        }
    ]


},
{
    timestamps : true

});
const Topic = mongoose.model('Topic',topicSchema);
module.exports = Topic;