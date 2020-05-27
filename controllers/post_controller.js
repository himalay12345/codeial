const Post = require('../models/posts');


module.exports.create = function(req,res)
{
    Post.create({
        content:req.body.content,
        topic:req.body.topic,
        user:req.user._id
    },function(err,post)
    {
        if(err)
        {
            console.log('Error in creating post database');
            return;
        }

        return res.redirect('back');
    });
}


