const Comment = require('../models/comments');
const Answer = require('../models/answers');
const commentMailer = require('../mailers/comment_mailer');

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

                comment = await comment.populate('user', 'name email').execPopulate();
                commentMailer.newComment(comment);
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
        console.log('Error',err);
        return;
    }
   
}

module.exports.destroy =async function(req,res)
{
    try{
        let comment = await Comment.findById(req.params.id);
        
        if(comment.user == req.user.id)
            {
                let answerId = comment.answer;
                // console.log(answerId);
                comment.remove();

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