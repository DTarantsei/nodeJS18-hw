require('../strategies/index');

const express = require('express');
const passport = require('passport');

const { auth, responseWithToken } = require('../controllers/auth-controller');

const router = express.Router();


router.post('/auth', auth);

router.post('/localAuth',
  passport.authenticate('local', { failureRedirect: '/error', session: false }),
  (req, res) => responseWithToken(req, res)
);

router.get('/facebookAuth',
  passport.authenticate('facebook'));
router.get('/facebookAuth/callback',
  passport.authenticate('facebook', { failureRedirect: '/error', session: false  }),
  (req, res) => responseWithToken(req, res)
);

router.get('/twitterAuth',
  passport.authenticate('twitter'));
router.get('/twitterAuth/callback',
  passport.authenticate('twitter', { failureRedirect: '/error', session: false  }),
  (req, res) => responseWithToken(req, res)
);

router.get('/googleOAuth',
  passport.authenticate('google'));
router.get('/googleOAuth/callback',
  passport.authenticate('google', { failureRedirect: '/error', session: false  }),
  (req, res) => responseWithToken(req, res)
);

module.exports = router;
