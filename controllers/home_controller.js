const Answer = require('../models/answers');
const Post = require('../models/posts');
const User = require('../models/users');

module.exports.home = function(req,res)
{
  Post.find({}).populate('user')
    .populate({
        path:'answers',
        populate: {
            path:'comments',
            populate: {
                path:'user'
            }
        }
    }
    )
    .populate({
        path:'answers',
        populate: {
            path:'user'
           }
    }
    )
    .exec(function(err,posts)
    {
        User.find({},function(err,users){
            return res.render('home',{
                title:"Codeial | Home",
                posts:posts,
                all_users:users
            });
        })        
    });
    
    
}

module.exports.contact = function(req,res)
{
    return res.render('contact',{
        title:"Contact Us"
    });
}