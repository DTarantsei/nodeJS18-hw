require('../strategies/index');

const express = require('express');
const passport = require('passport');

const { auth } = require('../controllers/auth-controller');

const router = express.Router();


router.post('/auth', auth);

router.post('/localAuth',
  passport.authenticate('local', { failureRedirect: '/error', session: false }),
  (req, res) => res.redirect('/success?username='+req.body.login),
);

router.get('/facebookAuth',
  passport.authenticate('facebook'));
router.get('/facebookAuth/callback',
  passport.authenticate('facebook', { failureRedirect: '/error', session: false  }),
  (req, res) => res.redirect('/success?username='+req.user.username)
);

router.get('/twitterAuth',
  passport.authenticate('twitter'));
router.get('/twitterAuth/callback',
  passport.authenticate('twitter', { failureRedirect: '/error', session: false  }),
  (req, res) => res.redirect('/success?username='+req.user.username)
);

router.get('/googleOAuth',
  passport.authenticate('google'));
router.get('/googleOAuth/callback',
  passport.authenticate('google', { failureRedirect: '/error', session: false  }),
  (req, res) => res.redirect('/success?username='+req.user.username)
);

module.exports = router;
