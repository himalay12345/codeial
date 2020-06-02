const User = require('../models/users');


module.exports.create = function(req,res)
{
    User.findById(req.params.id,function(err,user)
    {
        return res.render('profile',{
            title:"Profile",
            profile_user:user
        });
    });
    
}

module.exports.question = function(req,res)
{
    
    User.findById(req.user._id,function(err,user)
    {
        return res.render('profile_question',{
            title:"Profile | Questions",
            profile_user:user
        });
    });
   

}
