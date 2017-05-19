const passport = require('passport'),
  User = require('../entities/users/model'),
  Admin = require('../entities/admins/model'),
  JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt,
  LocalStrategy = require('passport-local');

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
  INCORRECT_LOGIN: 'Your login details could not be verified. Please try again.'
};

const userLogin = new LocalStrategy(localOptions,
function(username, password, done) {
  User.findOne({username: username}, function(err, user) {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false, {error: returnMessages.INCORRECT_LOGIN});
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

const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  User.findById(payload._id, function(err, user) {
    if (err) {
      return done(err, false);
    }

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

passport.use('jwt', jwtLogin);
passport.use('user', userLogin);
passport.use('admin', adminLogin);
