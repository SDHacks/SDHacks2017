const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

const User = require('../entities/users/model');
const Admin = require('../entities/admins/model');

require('dotenv').config();

const localOptions = {
  usernameField: 'username'
};

const jwtOptions = {
  // Telling Passport to check authorization headers for JWT
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  // Telling Passport where to find the secret
  secretOrKey: process.env.SESSION_SECRET
};

const returnMessages = {
  INCORRECT_LOGIN: 'Your login details could not be verified. Please try again.',
  NOT_CONFIRMED: 'You have not yet confirmed this account'
};

const userLogin = new LocalStrategy(localOptions,
function(username, password, done) {
  User.findOne({username: {$regex : new RegExp(username, 'i')}},
  function(err, user) {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false, {error: returnMessages.INCORRECT_LOGIN});
    }

    if (!user.confirmed) {
      return done(null, false, {error: returnMessages.NOT_CONFIRMED});
    }

    user.comparePassword(password, function(err, isMatch) {
      if (err) {
        return done(err);
      }
      if (!isMatch) {
        return done(null, false, {error: returnMessages.INCORRECT_LOGIN});
      }

      return done(null, user);
    });
  });
});

const adminLogin = new LocalStrategy(localOptions,
function(username, password, done) {
  Admin.findOne({username: username}, function(err, admin) {
    if (err) {
      return done(err);
    }
    if (!admin) {
      return done(null, false, {error: returnMessages.INCORRECT_LOGIN});
    }

    admin.comparePassword(password, function(err, isMatch) {
      if (err) {
        return done(err);
      }
      if (!isMatch) {
        return done(null, false, {error: returnMessages.INCORRECT_LOGIN});
      }

      return done(null, admin);
    });
  });
});

const jwtAdminLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  Admin.findById(payload._id, function(err, user) {
    if (err) {
      return done(err, false);
    }

    if (user) {
      return done(null, user);
    }
    return done(null, false);
  });
});

const jwtUserLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  User.findById(payload._id, function(err, user) {
    if (err) {
      return done(err, false);
    }

    if (user) {
      return done(null, user);
    }
    return done(null, false);
  });
});

passport.use('adminJwt', jwtAdminLogin);
passport.use('userJwt', jwtUserLogin);
passport.use('user', userLogin);
passport.use('admin', adminLogin);
