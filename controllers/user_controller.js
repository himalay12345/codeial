const User = require('../models/users');
const Post = require('../models/posts');
const fs = require('fs');
const path = require('path');

module.exports.post = function(req,res)
{
    res.render('post',{
        title:"Posts"
    });
}

// module.exports.reset = function(req,res)
// {

// }

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
        return res.redirect('/');
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

module.exports.update = async function(req,res){
  
    try{
        if(req.user.id == req.params.id)
        {
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req,res,function(err){
                if(err){console.log('*******Multer Error',err);return;}
                
                user.name = req.body.name;
                user.office = req.body.office;
                user.education = req.body.education;
                user.location = req.body.location;
                user.website = req.body.website;
                user.description = req.body.description;
                console.log(user.avatar);

                if(req.file)
                {
                    if(!user.avatar)   {
                        user.avatar = User.avatarPath +'/'+ req.file.filename;
                    }

                    else{

                        fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                        user.avatar = User.avatarPath +'/'+ req.file.filename;
                    }
                }

                user.save();


            });
            req.flash('success','Profile updated successfully');
            return res.redirect('back');
        }
    
        else{
            return res.status(401).send('Unauthorized Access');
        }
    }
    catch(err){
        console.log('Error',err);
        return;
    }
   
}
module.exports.createSession = function(req,res)
{
    req.flash('success','Logged in successfully');
   return res.redirect('/');
}

module.exports.destroySession = function(req,res)
{
    req.logout();
    req.flash('success','Logged out successfully');
    return res.redirect('/user/sign-in');
}

module.exports.answer =async function(req,res)
{
    try{
    let posts = await Post.find({}).populate('user');
    let users = await User.find({});
    let user = await User.findById(req.user._id);

        return res.render('answer',{
            title:"Codeial | Answer",
            posts:posts,
            users:users,
            temp:user
        });
    }
    
    catch(err)
    {
        console.log('Error',err);
        return;
    }
}