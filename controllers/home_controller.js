const Answer = require('../models/answers');
const Post = require('../models/posts');
const User = require('../models/users');

module.exports.home = async function(req,res)
{
    try{
        let posts = await Post.find({}).populate('user')
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
    );

let users = await User.find({});


    return res.render('home',{
        title:"Codeial | Home",
        posts:posts,
        all_users:users
    
    });   
    
    }

    catch(err){
        console.log('Error',err);
    }
}

module.exports.contact = function(req,res)
{
    return res.render('contact',{
        title:"Contact Us"
    });
}