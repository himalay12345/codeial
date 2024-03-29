const User = require('../models/users');
const Post = require('../models/posts');
const Temp = require('../models/temp');
const fs = require('fs');
const path = require('path');
var async = require("async");
// var nodemailer = require("nodemailer");
const nodeMailer = require('../config/nodemailer');
var crypto = require("crypto");
const env = require('../config/environment');

module.exports.message = async function(req,res)
{
    try{
        let users = await User.find({});
            return res.render('message',{
                title:'My Messages',
                users:users
            });
    }

    catch(err)
    {
        console.log('Error',err);
        return;
    }
}

module.exports.post = async function(req,res)
{
    try{
        
        let posts = await Post.find({}).sort('_createdAt').populate('user')
    .populate({
        path:'answers',
        populate: {
            path:'comments',
            populate: {
                path:'user',
                populate:{
                  path:'likes'
                }
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
    ).populate('likes');

let users = await User.find({});
// let user1 = await User.find({follower:req.user._id});



    return res.render('post',{
        title:"Codeial | Post",
        posts:posts,
        all_users:users
    });   
    
    }

    catch(err){
        console.log('Error',err);
        return;
    }
}

module.exports.temp = function(req,res)
{
    Temp.create({content:req.body.content},function(err)
    {
        if(err)
        {
            console.log('Error in creating temp data',err);
            return;
        }

        // return res.redirect('back');
    })
}

module.exports.reset = function(req,res)
{
    return res.render('forgot_passw',{
        title:'EduHub | Reset Password'
    });
}



module.exports.home = function(req,res)
{
    return res.render('_home-signin',{
        title:'EduHub | Sign-in'
    });
}

module.exports.signUp = function(req,res)
{
    if(req.isAuthenticated()){
        return res.redirect('/');
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

module.exports.forgot = function(req, res, next) {
    async.waterfall([
      function(done) {
        crypto.randomBytes(20, function(err, buf) {
          var token = buf.toString('hex');
          done(err, token);
        });
      },
      function(token, done) {
        User.findOne({ email: req.body.email }, function(err, user) {
          if (!user) {
            req.flash('error', 'No account with that email address exists.');
            return res.redirect('back');
          }
  
          user.resetPasswordToken = token;
          user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
  
          user.save(function(err) {
            done(err, token, user);
          });
        });
      },
      function(token, user, done) {
        nodeMailer.transporter.sendMail({
          to: user.email,
          from: 'himalayshankar31@gmail.com',
          subject: 'Node.js Password Reset',
          text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
            'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
            'http://' + req.headers.host + '/reset/' + token + '\n\n' +
            'If you did not request this, please ignore this email and your password will remain unchanged.\n'
        },function(err) {
          console.log('mail sent');
          req.flash('success', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
          done(err, 'done');
        });
      }
    ], function(err) {
      if (err) return next(err);
      res.redirect('back');
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
                    console.log('Error in creating account in signup',err);
                    return;
                }
                req.flash('success','Account created successfully');
                return res.redirect('/user/sign-in');
            });
        }

        else{
            req.flash('error','Email Adress already exists');
            return res.redirect('back');
        }
    });
}

module.exports.topicRemove = async function(req,res)
{
    try{
        let topic = await User.findById(req.query.id);
        var userId = req.query.id;
        console.log('Im in');
        if(topic.id == req.user.id)
        {
            // console.log(req.query.id);
           let user1  = await User.findByIdAndUpdate(userId, { $pull: {interests:{$in:req.query.topic}}
            });
            
            req.flash('success','Topic removed successfully');
            return res.redirect('back');
        }
    }

    catch(err)
    {
        console.log('Error',err);
        return;
    }
}

module.exports.topic = async function(req,res)
{
    try{
        if(req.user.id == req.params.id)
        {
            let user = await User.findById(req.params.id);
            console.log(req.body.topic.length);
       
        if(typeof(req.body.topic)=='object'){
           for(var i=0;i<req.body.topic.length;i++)
           {
            let new_user = await User.findOne({interests : req.body.topic[i], _id:req.params.id});
                
            if(!new_user)
                {
                    // console.log(req.body.topic[i]);
                user.interests.push(req.body.topic[i]);
                
                }
            // console.log(req.body.topic[i]);
           }
           user.save();
          
        }

        else{
            User.findOne({interests : req.body.topic, _id:req.params.id},function(err,new_user)
            {
                if(err)
                {
                    console.log('Error in finding interest',err);
                    return;
                }
                if(!new_user)
                {
                user.interests.push(req.body.topic);
                user.save();
                }
            });

            
        }
           
            req.flash('success','Topic added successsfully');
           return res.redirect('back');
        }


    }

    catch(err)
    {
      console.log("Error",err);
      return;
    }
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
    return res.redirect('/user/home');
}

module.exports.answer =async function(req,res)
{
    try{
    let posts = await Post.find({}).populate('user');
    
    
    let users = await User.find({})
    .populate({
        path:'answers'
        
    }
    );
        
    let user = await User.findById(req.user._id).populate({path: 'questions'})
    .populate({
        path:'answers'
        
    }
    )
    .populate({
        path:'answers',
        populate: {
            path:'question',
            populate: {
                path:'user'
            }
           }
    }
    );

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