const Answer = require('../models/answers');
const Post = require('../models/posts');

module.exports.home = function(req,res)
{
    // Answer.find({}).populate('user').exec(function(err,answers)
    // {
    //     if(err)
    //     {
    //         console.log('Error in finding answer database');
    //         return;
    //     }
    //     return res.render('home',{
    //         title:"Codeial | Home",
    //         answers:answers
    //     });
        
    // });
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
        if(err)
        {
            console.log('Error in finding post database');
            return;
        }

        return res.render('home',{
            title:"Codeial | Home",
            posts:posts
        });
        
    });
    
    
}

module.exports.contact = function(req,res)
{
    return res.render('contact',{
        title:"Contact Us"
    });
}