module.exports.home = function(req,res)
{
    return res.render('home',{
        title:"Codeial | Home"
    });
    
}

module.exports.contact = function(req,res)
{
    return res.render('contact',{
        title:"Contact Us"
    });
}