const User = require('../models/users');
const Post = require('../models/posts');

module.exports.profile = function(req,res)
{
    User.findById(req.params.id,function(err,user)
    {
        return res.render('profile',{
            title:"Profile",
            profile_user:user
        });
    })
    
}

module.exports.post = function(req,res)
{
    res.render('post',{
        title:"Posts"
    });
}

module.exports.signUp = function(req,res)
{
    if(req.isAuthenticated()){
        return res.redirect('/user/profile');
    }
    return res.render('sign_up_page',
    {
        title:'Codeial | Sign-Up'
    })
} 

module.exports.signIn = function(req,res)
{
    if(req.isAuthenticated()){
        return res.redirect('/user/profile');
    }
    return res.render('sign_in_page',
    {
        title:'Codeial | Sign-In'
    })
} 

module.exports.create = function(req,res)
{
    User.findOne({email : req.body.email},function(err,user)
    {
        if(err)
        {
            console.log('Error in finding user in signup');
            return;
        }
        if(!user)
        {
            User.create(req.body,function(err,user){
                if(err)
                {
                    console.log('Error in creating account in signup');
                    return;
                }
                return res.redirect('/user/sign-in');
            });
        }

        else{
            return res.redirect('back');
        }
    });
}
module.exports.createSession = function(req,res)
{
   return res.redirect('/');
}

module.exports.destroySession = function(req,res)
{
    req.logout();

    return res.redirect('/');
}

module.exports.answer = function(req,res)
{
    Post.find({}).populate('user').exec(function(err,posts)
    {
        if(err)
        {
            console.log('Error in finding post database');
            return;
        }

        return res.render('answer',{
            title:"Codeial | Answer",
            posts:posts
        });
        
    });

    // res.render('answer',{
    //     title:"Codeial | Answer"
    // });
}