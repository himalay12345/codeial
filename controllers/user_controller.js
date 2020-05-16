const User = require('../models/users');

module.exports.profile = function(req,res)
{
    res.render('profile',{
        title:"Profile"
    });
}

module.exports.post = function(req,res)
{
    res.render('post',{
        title:"Posts"
    });
}

module.exports.signUp = function(req,res)
{
    return res.render('sign_up_page',
    {
        title:'Codeial | Sign-Up'
    })
} 

module.exports.signIn = function(req,res)
{
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
    //Todo Later
}