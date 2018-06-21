const express = require('express');
const passport = require('passport');
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

module.exports = router;
