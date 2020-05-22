const Post = require('../models/posts');
const Answer = require('../models/answers');

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

module.exports.answer = function(req,res)
{
    Answer.create({
        content:req.body.content,
        topic:req.body.topic,
        question:req.body.question,
        user:req.user._id
    },function(err,answer)
    {
        if(err)
        {
            console.log('Error in creating answer database');
            return;
        }

        return res.redirect('back');
    });
}

