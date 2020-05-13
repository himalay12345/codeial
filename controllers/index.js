module.exports.home = function(req,res)
{
    return res.end('<h2>Express server is running.....</h2>');
};

module,exports.contact = function(req,res)
{
    return res.end('Contact page loaded...');
}