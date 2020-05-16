const User = require('../models/users');

module.exports.profile = function(req,res)
{
    if(req.cookies.user_id==undefined)
    {
        return res.redirect('/user/sign-in');
    }
   
    User.findOne({_id:req.cookies.user_id},function(err,user)
    {
         if(err)
        {
            console.log('Error in finding id for profile');
            return;
        }
        if(user)
        {
            res.render('profile',{
            title:"Profile",
            name:user.email
            });
        }

        else{
            return res.redirect('back');
        }
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
    User.findOne({_id:req.cookies.user_id},function(err,user)
    {

        if(!user)
        {
             return res.render('sign_in_page',
                        {
                            title:'Codeial | Sign-In'
                        });
        }

        else{
            return res.redirect('/user/profile');
        }
    });
    
   
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
    User.findOne({email:req.body.email},function(err,user)
    {
        if(err)
        {
            console.log('Error in finding user in signin');
            return;
        }

        if(user)
        {
            if(user.password!=req.body.password)
            {
                return res.redirect('back');  
            }
            
            res.cookie('user_id',user.id);
            return res.redirect('/user/profile');
         }

        else{
            return res.redirect('back');
        }
    });
}


module.exports.signOut = function(req,res)
{
    if(req.cookies.user_id)
    {
        res.cookie('user_id',null);
        return res.redirect('/user/sign-in');
    }

    return res.redirect('back');
}