module.exports.profile = function(req,res)
{
    res.render('profile',{
        title:"Profile"
    });
}

module.exports.post = function(req,res)
{
    res.render('post',{
        title:"Posts"
    });
}