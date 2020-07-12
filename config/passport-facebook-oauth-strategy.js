const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const crypto = require('crypto');
const User = require('../models/users');
const env = require('./environment');


passport.use(new FacebookStrategy({

    clientID: env.fb_client_id,
    clientSecret: env.fb_client_secret,
    callbackURL: env.fb_callback_url,
    profileFields: env.fb_profile_fields
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOne({email:profile.emails[0].value}).exec(function(err,user){
        if(err)
        {
            console.log('Error in facebook passport strategy',err);
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
                    console.log('Error in creating facebook passport strategy',err);
                    return;
                }
                return done(null,user);
            }
        }
    });
  }
));