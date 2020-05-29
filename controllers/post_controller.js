const Post = require('../models/posts');


module.exports.create = async function(req,res)
{
    try{
        await Post.create({
            content:req.body.content,
            topic:req.body.topic,
            user:req.user._id
        });
            req.flash('success','Question added successfully');
            return res.redirect('back');
    }
    catch(err){
        console.log("Error",err);
        req.flash('error','Please fill all the fields');
        return res.redirect('back');
        
    }
    
}


