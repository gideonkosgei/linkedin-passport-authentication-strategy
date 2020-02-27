const router = require('express').Router();
const passport = require('passport');

//auth login
router.get('/login',(req,res)=>{
    res.render('login',{user:req.user});
});

// auth logout
router.get('/logout',(req,res)=>{
    req.logout();
    res.redirect('/'); 
}); 

//auth with linkedin
router.get('/linkedin',passport.authenticate('linkedin',{
    scope : ['r_emailaddress', 'r_liteprofile']
}));

//callback route for linkedin to redirect to
router.get('/linkedin/redirect',passport.authenticate('linkedin'),(req,res)=>{
    //res.send(req.user); 
    res.redirect('/profile')

});
module.exports =router;

