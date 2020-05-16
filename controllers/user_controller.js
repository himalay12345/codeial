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

module.exports.signUp = function(req,res)
{
    return res.render('sign_up_page',
    {
        title:'Codeial | Sign-Up'
    })
} 

module.exports.signIn = function(req,res)
{
    return res.render('sign_in_page',
    {
        title:'Codeial | Sign-In'
    })
} 