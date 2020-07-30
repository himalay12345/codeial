const Answer = require('../models/answers');
const Post = require('../models/posts');
const Comment = require('../models/comments');
const User = require('../models/users');
const Like = require('../models/like');

module.exports.all = async function(req,res)
{
    try{
        let related = await Post.find({topic:req.query.topic});
        let posts = await Post.findById(req.query.id)
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
        return res.render('all_answers',{
            post:posts,
            temp:user,
            related:related,
            title:'Answers'
        });
    }
    catch(err)
    {
        console.log('Error',err);
        return;
    }
}

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
                    return res.redirect("/profile/answer/"+req.user._id);
                
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

            

            Like.deleteMany({likeable:answer, onModel:'Answer'});
            Like.deleteMany({_id: {
                $in:answer.comments
            }});
            
            
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


            if(req.xhr){
                return res.status(200).json({
                    data:{
                        post_id :req.params.id
                    },
                    message:"Post Deleted"
                });
            }
            req.flash('success','Answer removed successfully');
            return res.redirect('back');
            
        }

        else{
            return res.redirect('back');
        }
    });
}
