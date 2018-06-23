const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

//Fetching model class from mongoose
const User = mongoose.model('users');

//Serialize user to create a cookie from his GoogleID
passport.serializeUser((user, done) => {
    done(null, user.id)
});

//Deserialize user from his mongoDB ID
passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
            done(null, user);
    });
});

passport.use(new GoogleStrategy(
    {
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback',
        proxy: true //to prevent Error 400 @ google oauth
    },
    (accessToken, refreshToken, profile, done) => {
        User.findOne({ googleId: profile.id })
            .then(existingUser => {
                if(existingUser) {
                    //Such user exists
                    done(null, existingUser);
                } else {
                    //Create a new user
                    new User({ googleId: profile.id }).save()
                        .then(user => done(null, user));
                }
            })
    })
);