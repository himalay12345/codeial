const Answer = require('../models/answers');
const Post = require('../models/posts');
const User = require('../models/users');
var async = require("async");
// var nodemailer = require("nodemailer");
const nodeMailer = require('../config/nodemailer');
var crypto = require("crypto");

module.exports.home = async function(req,res)
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


module.exports.resetPage = function(req,res){
    User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
        if (!user) {
          req.flash('error', 'Password reset token is invalid or has expired.');
          return res.redirect('/user/sign-in');
        }
        res.render('reset', {token: req.params.token,
        title:'Reset Password'});
      });
}

module.exports.resetPassword = function(req, res) {
    async.waterfall([
      function(done) {
        User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
          if (!user) {
            req.flash('error', 'Password reset token is invalid or has expired.');
            return res.redirect('/user/sign-in');
          }
          if(req.body.password === req.body.confirm) {
            user.password = req.body.password;
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;
  
            user.save(function(err) {
            req.logIn(user, function(err) {
                done(err, user);
                });
              });
           
          } else {
              req.flash("error", "Passwords do not match.");
              return res.redirect('back');
          }
        });
      },
      function(user, done) {
        
        nodeMailer.transporter.sendMail({
          to: user.email,
          from: 'himalayshankar31@gmail.com',
          subject: 'Your password has been changed',
          text: 'Hello,\n\n' +
            'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
        }, function(err) {
          req.flash('success', 'Success! Your password has been changed.');
          done(err);
        });
      }
    ], function(err) {
      res.redirect('/user/sign-in')
    });
  }