var express = require('express');
var passport = require('passport');
var router = express.Router();
var multer= require('multer');
var upload= multer({dest:'public/img/'})

//router.get('/', function(req, res, next) {
//  res.render('index', { title: 'Express' });
//});

router.get('/login', function(req, res, next) {
  res.render('login', {layout:false, message: req.flash('loginMessage'),messagesignup: req.flash('signupMessage')});
});

router.post('/profile',upload.any(), function(req, res, next)
  {
    console.log("test ham");
    res.send(req.files);
  });

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
