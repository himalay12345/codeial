const User = require('../models/users');
const Post = require('../models/posts');


module.exports.create = function(req,res)
{
    User.findById(req.params.id,function(err,user)
    {
        return res.render('profile',{
            title:"Profile",
            profile_user:user
        });
    });
    
}

module.exports.question = async function(req,res)
{
    let sorted = { createdAt:-1};
    let user = await User.findById(req.user._id).populate({path: 'questions', options: { sort:(sorted)}});
    



        return res.render('profile_question',{
            title:"Profile | Questions",
            profile_user:user
        });
   
   

}

module.exports.answer = async function(req,res)
{
    let sorted = { createdAt:-1};
    let user = await User.findById(req.user._id).populate({path: 'questions', options: { sort:(sorted)}})
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
            profile_user:user
        });
   
   

}
