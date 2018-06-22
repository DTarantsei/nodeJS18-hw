const express = require('express');
const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const OAuthStrategy = require('passport-google-oauth').OAuth2Strategy;

const { auth } = require('../controllers/auth-controller');

const router = express.Router();


router.post('/auth', auth);

router.post('/localAuth',
  passport.authenticate('local', {
    failureRedirect: '/error',
    session: false,
  }),
  (req, res) => res.redirect('/success?username='+req.body.login),
);
router.post('/facebookAuth',
  passport.authenticate('facebook', {
    failureRedirect: '/error',
  }),
  (req, res) => res.redirect('/success?username='+req.body.login),
);
router.post('/twitterAuth',
  passport.authenticate('twitter', {
    failureRedirect: '/error',
  }),
  (req, res) => res.redirect('/success?username='+req.body.login),
);
router.post('/googleOAuth',
  passport.authenticate('google', {
    failureRedirect: '/error',
  }),
  (req, res) => res.redirect('/success?username='+req.body.login),
);

passport.use(new LocalStrategy({
    usernameField: 'login',
  },
  (login, password, done) => {
    let err;

    const user = {
      login: 'test',
      pass: '123',
    };

    if (login !== user.login || password !== user.pass) {
      err = 'error';
    }

    if (err) { return done(err); }
    return done(null, user);
  }
));

passport.use(new FacebookStrategy({
    clientID: 'facebook',
    clientSecret: 'client-secret',
  },
  (accessToken, refreshToken, profile, done) => (
    done(null, ({ login: profile.username, id: profile.id  }))
  )
));

passport.use(new TwitterStrategy({
    consumerKey: 'twitter-key',
    consumerSecret: 'twitter-secret',
  },
  (accessToken, refreshToken, profile, done) => (
    done(null, ({ login: profile.username, id: profile.id  }))
  )
));

passport.use(new OAuthStrategy({
    clientID: 'google-id',
    clientSecret: 'google-secret',
  },
  (accessToken, refreshToken, profile, done) => (
    done(null, ({ login: profile.username, id: profile.id  }))
  )
));

module.exports = router;
