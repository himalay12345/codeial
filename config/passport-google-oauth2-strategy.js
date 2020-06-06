const passsport = require('passport');
const googleStrategy = require('passport-google-oauth20').Strategy;
const crypto = require('crypto');
const User = require('../models/users');
require('dotenv').config();

passsport.use(new googleStrategy({
    clientID: process.env.G_CLIENTID,
    clientSecret: process.env.G_SECRET,
    callbackURL:"http://localhost:8000/user/auth/google/callback",
    proxy: true
},
    function(accessToken, refreshToken,profile,done){
        User.findOne({email:profile.emails[0].value}).exec(function(err,user){
            if(err)
            {
                console.log('Error in google passport strategy',err);
                return;
            }

            console.log(profile);
            console.log(accessToken);
            console.log(refreshToken);

            if(user){
                return done(null,user);
            }

            else{
                User.create({
                    name:profile.displayName,
                    email:profile.emails[0].value,
                    password:crypto.randomBytes(20).toString('hex'),
                    avatar:profile.photos[0].value
                }),function(err,new_user)
                {
                    if(err)
                    {
                        console.log('Error in creating google passport strategy',err);
                        return;
                    }
                   return done(null,new_user);
                }
            }
        });
    }
));