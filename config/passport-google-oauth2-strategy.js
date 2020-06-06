const passsport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/users');

passsport.use(new googleStrategy({
    clientID:"955668639561-35acsgkuf98blda89neud115jvhgqs90.apps.googleusercontent.com",
    clientSecret:"H6-oQf-gnFblL4wLdTawRebK",
    callbackURL:"http://localhost:8000/user/auth/google/callback",
    profileFields: [
        "id",
        "email",
        "emails",
        "gender",
        "link",
        "locale",
        "name",
        "timezone",
        "updated_time",
        "verified"
        ],
        enableProof: true,
    scope: 'openid profile email'
},
    function(req,accessToken, refreshToken,profile,done){

        User.findOne({email:profile.emails[0].value}).exec(function(err,user){
            if(err)
            {
                console.log('Error in google passport strategy',err);
                return;
            }

            console.log(profile);



            if(user){
                return done(null,user);
            }

            else{
                User.create({
                    name:profile.displayName,
                    email:profile.emails[0].value,
                    password:crypto.randomBytes(20).toString('hex'),
                    avatar:profile.photos[0].value

                }),function(err,user)

                {
                    if(err)
                    {
                        console.log('Error in creating google passport strategy',err);
                        return;
                    }
                    return done(null,user);

                }
            }
        });
    }
));