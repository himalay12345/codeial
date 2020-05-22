const Answer = require('../models/answers');

module.exports.home = function(req,res)
{
    Answer.find({}).populate('user').exec(function(err,answers)
    {
        if(err)
        {
            console.log('Error in finding answer database');
            return;
        }
        return res.render('home',{
            title:"Codeial | Home",
            answers:answers
        });
        
    });

    
    
}

module.exports.contact = function(req,res)
{
    return res.render('contact',{
        title:"Contact Us"
    });
}