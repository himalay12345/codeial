const Answer = require('../models/answers');
const Post = require('../models/posts');
const Comment = require('../models/comments');
const User = require('../models/users');

module.exports.create =async function(req,res)
{
    let post = await Post.findById(req.body.question).sort('_createdAt');

            if(post)
            {
                   let answer = await Answer.create({
                    content:req.body.content,
                    topic:req.body.topic,
                    question:req.body.question,
                    user:req.user._id
                });

                 User.findById(req.user._id,function(err,user)
                    {
                        if(err)
                        {
                            console.log('Error in finding User');
                            return;
                        }
                        user.answers.push(answer);
                        user.save();
                    });
                    post.answers.push(answer);
                    post.save();
                    req.flash('success','Answer added successfully');
                    return res.redirect('back');
                
        }

}

module.exports.destroy = function(req,res)
{
    Answer.findById(req.params.id,function(err,answer)
    {
        if(answer.user == req.user.id)
        {
            let postId = answer.question;
            let userId = req.user._id;
            answer.remove();
            
            Comment.deleteMany({answer:req.params.id},function(err)
            {
                if(err)
                return res.redirect('back');
            });

            Post.findByIdAndUpdate(postId, { $pull: {answers:req.params.id}
            },function(err,post){
            if(err)
            {
                console.log('error in deleting post database');
                return;
            }
            });

            User.findByIdAndUpdate(userId, { $pull: {answers:req.params.id}
            },function(err,user){
            if(err)
            {
                console.log('error in deleting post database');
                return;
            }
            });
            req.flash('success','Answer removed successfully');
            return res.redirect('back');
            
        }

        else{
            return res.redirect('back');
        }
    });
}
