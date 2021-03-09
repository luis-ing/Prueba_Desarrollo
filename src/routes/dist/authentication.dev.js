"use strict";

var express = require('express');

var router = express.Router();

var passport = require('passport'); // REGISTRO


router.get('/signup', function (req, res) {
  res.render('auth/signup');
});
router.post('/signup', passport.authenticate('local.signup', {
  successRedirect: '/profile',
  failureRedirect: '/signup',
  failureFlash: true
})); // INGRESAR

router.get('/signin', function (req, res) {
  res.render('auth/signin');
});
router.post('/signin', function (req, res, next) {
  passport.authenticate('local.signin', {
    successRedirect: '/profile',
    failureRedirect: '/signin',
    failureFlash: true
  })(req, res, next);
});
router.get('/profile', function (req, res) {
  res.render('profile');
});
module.exports = router;