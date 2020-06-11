const Comment = require('../models/comments');
const Answer = require('../models/answers');
const commentMailer = require('../mailers/comment_mailer');
const queue = require('../config/kue');
const emailWorkers = require('../workers/comment_email_worker');
const Like = require('../models/like');

module.exports.create = async function(req,res)
{
    try{
        let answer = await Answer.findById(req.body.answer);

        if(answer)
        {
            let comment = await Comment.create({
                content:req.body.content,
                post:req.body.post,
                answer:req.body.answer,
                user:req.user._id
            });
                
                answer.comments.push(comment);
                answer.save();

                comment = await comment.populate('user', 'name email avatar').execPopulate();
                // commentMailer.newComment(comment);
                // let job = queue.create('emails',comment).save(function(err)
                // {
                //     if(err)
                //     {
                //         console.log('Error in enqueque comment',err);
                //         return;
                //     }

                //     console.log('Job enqueued',job.id);
                // });
                if (req.xhr){
                    // Similar for comments to fetch the user's id!
        
                    return res.status(200).json({
                        data: {
                            comment: comment
                        },
                        message: "Post created!"
                    });
                }
    
                req.flash('success','Comment added successfully');
                return(res.redirect('back'));
          
        }
    }

    catch(error)
    {
        console.log('Error',error);
        return;
    }
   
}

module.exports.destroy =async function(req,res)
{
    try{
        let comment = await Comment.findById(req.params.id);
        // console.log(comment.user);
        // console.log(req.user.id);
        
        if(comment.user == req.user.id)
            {
                // console.log(comment.user);
                // console.log(req.user.id);
                let answerId = comment.answer;
                // console.log(answerId);
                comment.remove();
                await Like.deleteMany({likeable:comment._id,onModel:'Comment'});

                Answer.findByIdAndUpdate(answerId, { $pull: {comments:req.params.id}
                });

                if (req.xhr){
                    return res.status(200).json({
                        data: {
                            comment_id: req.params.id
                        },
                        message: "Post deleted"
                    });
                }
                
                req.flash('success','Comment removed successfully');
                return res.redirect('back');
               
            }

            else{
                return res.redirect('back');
            }
    }
    catch(error)
    {
        console.log('Error',error);
        return;
    }
    
}