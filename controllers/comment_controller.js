const Comment = require('../models/comments');
const Answer = require('../models/answers');

module.exports.create = function(req,res)
{
    Answer.findById(req.body.answer,function(err,answer)
    {
        if(err)
        {
            console.log('Error in finding answer');
            return;
        }

        if(answer)
        {
            Comment.create({
                content:req.body.content,
                post:req.body.post,
                answer:req.body.answer,
                user:req.user._id
            },function(err,comment)
            {
                if(err)
                {
                    console.log('Error in creating answer database');
                    return;
                }
                
                answer.comments.push(comment);
                answer.save();
                req.flash('success','Comment added successfully');
                return(res.redirect('back'));
            });
        }
    });
    
}

module.exports.destroy = function(req,res)
{
    Comment.findById(req.params.id,function(err,comment)
    {
        if(comment.user == req.user.id)
        {
            let answerId = comment.answer;
            console.log(answerId);
            comment.remove();

            Answer.findByIdAndUpdate(answerId, { $pull: {comments:req.params.id}
            },function(err,post){
            if(err)
            {
                console.log('error in deleting answer database');
            }
                req.flash('success','Comment removed successfully');
                return res.redirect('back');
            });
        }

        else{
            return res.redirect('back');
        }
    });
}