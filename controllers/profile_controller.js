const User = require('../models/users');
const Post = require('../models/posts');
const Follower = require('../models/follower');
const Message = require('../models/message');


module.exports.create = async function(req,res)
{
    try{
        // let sender = await Message.find({reciever:req.user._id,sender:req.params.id});
        // let reciever = await Message.find({reciever:req.params.id,sender:req.user._id}); 
        let user1 = await User.find({follower:req.user._id});
    // let user2 = await User.findOne({follower:req.user._id});
    
        let user = await User.findById(req.params.id)
        .populate({path: 'questions'})
        .populate({
            path:'answers'
    
        }
        );


        return res.render('profile',{
            title:"Profile",
            profile_user:user,
            user1:user1
            // sender:sender,
            // reciever:reciever
            // user2:user2
        });
 
    
}
    catch(err)
    {
        console.log(err);
        return;
    }
}

module.exports.following = async function(req,res)
{
    try{
        let user1 = await User.find({follower:req.params.id});
    // let user2 = await User.findOne({follower:req.user._id});
    
        let user = await User.findById(req.params.id)
        .populate({path: 'questions'})
        .populate({
            path:'answers'
    
        }
        );


        return res.render('profile_following',{
            title:"Profile | Following",
            profile_user:user,
            user1:user1
            // user2:user2
        });
 
    
}
    catch(err)
    {
        console.log(err);
        return;
    }
}

module.exports.follower = async function(req,res)
{
    try{
        let user1 = await User.find({follower:req.params.id});
        let user2 = await User.find({following:req.params.id});
    
        let user = await User.findById(req.params.id)
        .populate({path: 'questions'})
        .populate({
            path:'answers'
    
        })
        



        return res.render('profile_follower',{
            title:"Profile | Follower",
            profile_user:user,
            user1:user1,
            user2:user2
            // user2:user2
        });
 
    
}
    catch(err)
    {
        console.log(err);
        return;
    }
}


module.exports.question = async function(req,res)
{
    let user1 = await User.find({follower:req.params.id});
    let sorted = { createdAt:-1};
    let user = await User.findById(req.params.id).populate({path: 'questions', options: { sort:(sorted)}})
    .populate({
        path:'answers'
        
    }
    );
    



        return res.render('profile_question',{
            title:"Profile | Questions",
            profile_user:user,
            user1:user1
        });
   
    }
    
    
   



module.exports.answer = async function(req,res)
{
    let user1 = await User.find({follower:req.params.id});
    let sorted = { createdAt:-1};
    let user = await User.findById(req.params.id).populate({path: 'questions', options: { sort:(sorted)}})
    .populate({
        path:'answers',
        populate: {
            path:'question',
            populate: {
                path:'user'
            }
           },options: { sort:(sorted)}
    }
    );
    



        return res.render('profile_answers',{
            title:"Profile | Answers",
            profile_user:user,
            user1:user1
        });
   
   

}
