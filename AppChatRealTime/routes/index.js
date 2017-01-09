  var express = require('express');
var passport = require('passport');
var multer= require('multer');
var User = require('../models/user');
var router = express.Router();
var multer= require('multer');



var link = "";


var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './public/img');
  },
  filename: function (req, file, callback) {

      var image = file.fieldname + '-' + Date.now() + ".png";
    callback(null, image);
      link = './img/' + image;
  }

    
});
console.log(link);
var upload = multer({storage : storage}).single('userPhoto');

router.get('/main',function(req,res){
      res.sendFile(__dirname + "/main");
});

router.post('/api/photo',function(req,res){
    console.log(req.user);
    upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }
        User.findById({'_id': req.user._id}, function(err, user){
            
          user.local.avatar = link;
            
            user.save();
        });
        res.redirect('/');
    });

});
// router.listen(3000,function(){
//     console.log("Working on port 3000");
// });


router.get('/login', function(req, res, next) {
  res.render('login', {layout:false, message: req.flash('loginMessage'),messagesignup: req.flash('signupMessage')});
});

// router.post('/profile',upload.any(), function(req, res, next)
//   {
//     console.log("test ham");
//     res.send(req.files);
//   });

router.get('/', isLoggedIn, function(req, res) {
  res.render('profile', { user: req.user });
});

router.get('/info',function(req,res){
   res.json(req.user); 
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/login');
});

router.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/login',
  failureRedirect: '/login',
  failureFlash: true,
}));

router.post('/login', passport.authenticate('local-login', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true,
  }));

           

router.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));

router.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: '/login',
}));

router.get('/auth/twitter', passport.authenticate('twitter'));

router.get('/auth/twitter/callback', passport.authenticate('twitter', {
  successRedirect: '/',
  failureRedirect: '/login',
}));

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback', passport.authenticate('google', {
  successRedirect: '/',
  failureRedirect: '/login',
}));

router.get('/search/:Username',isLoggedIn,function(req,res){
   var name = req.params.Username;
    var find = false;
    User.findOne({'facebook.name':name},function(err, user) {
        if (err)
            return done(err);
        if (user)
            res.json(user);
            
    })
    
    User.findOne({'local.name':name},function(err, user) {
        if (err)
            return done(err);
        if (user)
            res.json(user);
    })
});

router.post('/addfriend',isLoggedIn,function(req,res){
    var user = req.user, fr = req.body;
    User.findOne({'_id': user.id},function(err,user){
        console.log('UPDATE');
       user.friends.push(fr._id);
        user.save();
        res.json(fr._id);
    });
});

router.get('/notification', isLoggedIn, function(req,res){
    User.findOne({'_id': req.user._id}, function(err,user){
        var data = user.notification;
        res.json(data);
    });
});

module.exports = router;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
      return next();
  res.redirect('/login');
}
