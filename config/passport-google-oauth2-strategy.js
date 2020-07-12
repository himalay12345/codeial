const passport = require('passport');
const googleStrategy = require('passport-google-oauth20').Strategy;
const crypto = require('crypto');
const User = require('../models/users');
require('dotenv').config();
const env = require('./environment');

passport.use(new googleStrategy({
    clientID: env.google_client_id,
    clientSecret: env.google_client_secret,
    callbackURL: env.google_callback_url,
},
    function(accessToken, refreshToken,profile,done){

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

                },function(err,user)

                {
                    if(err)
                    {
                        console.log('Error in creating google passport strategy',err);
                        return;
                    }
                    return done(null,user);

                });
            }
        });
    }
));