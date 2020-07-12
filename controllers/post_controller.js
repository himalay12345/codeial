const Post = require('../models/posts');
const User = require('../models/users');


module.exports.create = async function(req,res)
{
    try{
        let post = await Post.create({
            content:req.body.content,
            topic:req.body.topic,
            user:req.user._id
        });
        let user = await User.findById(req.user._id);
            user.questions.push(post);
            user.save();

            req.flash('success','Question added successfully');
            return res.redirect('/profile/question/'+req.user.id);
    }
    catch(err){
        console.log("Error",err);
        req.flash('error','Please fill all the fields');
        return res.redirect('back');
        
    }
    
}


