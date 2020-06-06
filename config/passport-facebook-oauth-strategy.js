const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const crypto = require('crypto');
const User = require('../models/users');


passport.use(new FacebookStrategy({

    clientID: '247163950066857',
    clientSecret: 'c522c88a2060f9d8861cf47228f1964d',
    callbackURL: "http://localhost:8000/user/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'picture.type(large)', 'email']
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