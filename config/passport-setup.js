const passport = require('passport');
const GoogleStrategy = require("passport-google-oauth20");
const User = require('../database/Schema/userSchema.js');
const keys = require('./keys');

passport.serializeUser((user, done) =>{
    done(null, user._id);
    // if you use Model.id as your idAttribute maybe you'd want
    // done(null, user.id);
});

passport.deserializeUser((id, done) =>{
  User.findById(id, (err, user) =>{
    done(err, user);
  });
});

passport.use(
	new GoogleStrategy({
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret,
    callbackURL: "/auth/google/callback"
  },
  function(accessToken, refreshToken, profile,done) {
    User.findOne({_id:profile.id},{__v:0},(err,currentUser)=>{
    	if(currentUser){
    		console.log('user is:',currentUser);
    		done(err, currentUser);
    	}else{
    	new User({
        _id: profile.id,
        name: profile.name.givenName,
        secondName: profile.name.familyName,
        email: profile.emails[0].value,
        photoURI:profile.photos[0].value,
        ownFiles: [],
        secondFiles: []
    	}).save().then((newUser)=>{
    		console.log('new user created'+newUser);
    		done(err, newUser);
    	});

    	}

    });
  }
  ));
