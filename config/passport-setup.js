const passport = require('passport');
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const keys = require('./keys');
const User = require('../models/user-model'); 


passport.serializeUser((user,done)=> {
    done(null,user.id)
});

passport.deserializeUser((id,done)=> {
    User.findById(id).then((user)=>{
        done(null,user);
    })
    
});


passport.use(new LinkedInStrategy({
    //options for linkedin strategy
     callbackURL: '/auth/linkedin/redirect',
     clientID: keys.linkedin.clientID,
     clientSecret: keys.linkedin.clientSecret    
   },(accessToken,refreshToken,profile,done ) => {
       //check if user already exists in our DB
       User.findOne({sourceId:profile.id}).then((currentUser)=>{
           if(currentUser){
               //already have the user
               //console.log('current user'+currentUser);
               done(null,currentUser);
           } else {
                console.log(profile);
               //create new user in the DB
               new User({
                username:profile.displayName,
                sourceId:profile.id,
                thumbnail:profile._json.profilePicture.displayImage,
                source:'linkedin'
              
            }).save().then((newUser)=>{
               // console.log('new user created:'+newUser);
                done(null,newUser);
            })
           }

       })
    
   
    
})
); 