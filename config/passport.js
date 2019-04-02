/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
/* eslint-disable no-underscore-dangle */
const passport = require('passport');
const request = require('request');
const { Strategy: LocalStrategy } = require('passport-local');

const User = require('../models/User');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

/**
 * Sign in using Email and Password.
 */
passport.use(new LocalStrategy(
  (async (email, password, done) => {
    let user;
    try {
      user = await User.findOne({ email: email.toLowerCase() }).exec();
      if (!user) {
        return done(null, false, { message: 'No user by that email.' });
      }
    } catch (e) {
      return done(e);
    }

    const match = await user.comparePassword(password);
    if (!match) {
      return done(null, false, { message: 'Password is incorrect.' });
    }

    return done(null, user);
  }),
));

/**
 * Login Required middleware.
 */
exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};

/**
 * Authorization Required middleware.
 */
exports.isAuthorized = (req, res, next) => {
  const provider = req.path.split('/').slice(-1)[0];
  const token = req.user.tokens.find(token => token.kind === provider);
  if (token) {
    next();
  } else {
    res.redirect(`/auth/${provider}`);
  }
};
