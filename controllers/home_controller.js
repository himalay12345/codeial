const Answer = require('../models/answers');
const Post = require('../models/posts');
const User = require('../models/users');
const Topic = require('../models/topic');
var async = require("async");
// var nodemailer = require("nodemailer");
const nodeMailer = require('../config/nodemailer');
var crypto = require("crypto");


module.exports.topic = async function(req,res)
{
  try{
    let allTopics = await Topic.find({});
    let topics = await Topic.findOne({name:req.params.id});
    let user1 = await User.findById(req.user.id).populate('user');
    let posts = await Post.find({topic:req.params.id})
    .populate({
      path:'answers',
      populate: {
          path:'question',
          populate: {
              path:'user'
          }
         }
  }
  )
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
).populate('likes').populate('user');
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

        return res.render('topic',{
          temp:user,
          posts:posts,
          related:allTopics,
          topic:topics,
          title:"Topic |"+ req.params.id,
          user1:user1,

});

  }

  catch(err)
  {
    console.log('Error',err);
    return;
  }

}

module.exports.blog = function(req,res)
{
  return res.render('blog',{
    title:"EduHub | Blog",

});  
}


module.exports.home = async function(req,res)
{
    try{
        let user1 = await User.find({follower:req.user._id});
        let posts = await Post.find({}).sort('_createdAt').populate('user')
        .populate({
          path:'answers',
          populate: {
              path:'question',
              populate: {
                  path:'user'
              }
             }
      }
      )
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

 
let top_users = await User.find({})
.populate({
    path:'answers'
    
}
);



    return res.render('post',{
        title:"Codeial | Home",
        posts:posts,
        all_users:users,
        users:top_users,
        user1:user1
    
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