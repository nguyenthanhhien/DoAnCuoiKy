var express = require('express');
var passport = require('passport');
var router = express.Router();
var multer= require('multer');

var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './public/img');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now() + ".png");
  }
});
var upload = multer({storage : storage}).single('userPhoto');

router.get('/main',function(req,res){
      res.sendFile(__dirname + "/main");
});

router.post('/api/photo',function(req,res){
    upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }
        res.render('profile', {layout:false, message: req.flash('loginMessage'),messagesignup: req.flash('signupMessage')});
        res.end("File is uploaded");

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
  res.render('profile', { user: req.user});
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

module.exports = router;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
      return next();
  res.redirect('/login');
}
