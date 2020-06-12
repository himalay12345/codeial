const User = require('../models/users');
const Follower = require('../models/follower');


module.exports.toggleFollow = async function(req,res) {
 
    try{
        let deleted = false;

    let user2 = await User.findById(req.params.id);
    let user1 = await User.findById(req.user._id);

    let existingFollow = await Follower.findOne({
        to_user:req.params.id,
        from_user:req.user._id
    });


    if(existingFollow)
    {
        user1.following.pull(user2._id);
        user2.follower.pull(user1._id);
        user1.save();
        user2.save();

        existingFollow.remove();
        deleted  = true;
    }

    else{
        let newFollow = await Follower.create({
            from_user:req.user._id,
            to_user:req.params.id
        });

        user1.following.push(user2._id);
        user2.follower.push(user1._id);
        user1.save();
        user2.save();
    }

    return res.json(200,{
        message:'Request successful',
        data:{
            deleted:deleted
        }
    });

    }

    catch(err)
    {
        console.log(err);
        return;
    }

}