const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/uploads/users/avatars');
var passportLocalMongoose=require("passport-local-mongoose");

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
        required : true
    },
    message_sender:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    description:{
        type:String
    },
    office:{
        type:String
    },
    location:{
        type:String
    },
    education:{
        type:String
    },
    website:{
        type:String
    },
    avatar:{
        type:String
    },
    questions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
        }
    ],
    answers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Answer'
        }
    ],
    follower: [
        { 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Follower' 
        }
    ]
,
following: [
    { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Follower' 
    }
],
interests:[{
    type:String
}],
resetPasswordToken: String,
resetPasswordExpires: Date,
},
    {
        timestamps : true
    }
    
);

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'..',AVATAR_PATH));
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now());
    }
  });

  //static function
  userSchema .statics.uploadedAvatar = multer({ storage: storage }).single('avatar');
  userSchema.statics.avatarPath = AVATAR_PATH;

userSchema.plugin(passportLocalMongoose);
const User = mongoose.model('User',userSchema);
module.exports = User;