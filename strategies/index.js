const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const OAuthStrategy = require('passport-google-oauth').OAuth2Strategy;

passport.use(new LocalStrategy({
    usernameField: 'login',
  },
  (login, password, cb) => {
    let err;

    const user = {
      login: 'test',
      pass: '123',
    };

    if (login !== user.login || password !== user.pass) {
      err = 'error';
    }

    if (err) { return cb(err); }
    return cb(null, user);
  }
));

passport.use(new FacebookStrategy({
    clientID: '893004140872745',
    clientSecret: '84b46d136b51c5558cefe3b78a382dfc',
    callbackURL: "http://localhost:7070/api/facebookAuth/callback",
  },
  (accessToken, refreshToken, profile, cb) => (
    cb(null, { username: profile.displayName, id: profile.id  })
  )
));

passport.use(new TwitterStrategy({
    consumerKey: 'key',
    consumerSecret: 'secret',
  },
  (accessToken, refreshToken, profile, cb) => (
    cb(null, { username: profile.displayName, id: profile.id  })
  )
));

passport.use(new OAuthStrategy({
    clientID: 'id',
    clientSecret: 'secret',
  },
  (accessToken, refreshToken, profile, cb) => (
    cb(null, { username: profile.displayName, id: profile.id  })
  )
));
