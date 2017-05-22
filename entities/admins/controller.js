const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const setUserInfo = require('./helper').setUserInfo;
const roleAuth = require('./helper').roleAuth;

module.exports = function(app, config) {

  // Model and Config
  var Admin = require('./model');
  var User = require('../users/model');

  const adminRoutes = express.Router();
  const authRoutes = express.Router();
  const apiRoutes = express.Router();

  app.use('/admin', adminRoutes);
  adminRoutes.use('/auth', authRoutes);
  adminRoutes.use('/api', apiRoutes);

  // Middleware to require login/auth
  const requireAuth = passport.authenticate('jwt', {session: false});
  const requireLogin = passport.authenticate('admin', {session: false});

  function generateToken(user) {
    return jwt.sign(user, config.SESSION_SECRET, {
      expiresIn: 10080
    });
  }

  // Authentication
  authRoutes.post('/login', requireLogin, function (req, res) {
    var adminInfo = setUserInfo(req.user);

    res.status(200).json({
      token: `JWT ${generateToken(adminInfo)}`,
      user: adminInfo
    });
  });

  authRoutes.post('/register', function(req, res, next) {
    if (!req.body.username || !req.body.password) {
      return next('Bad Registration: Could not find username and password');
    }

    // Check for registration errors
    const username = req.body.username;
    const password = req.body.password;

    Admin.findOne({username: username}, function(err, existingAdmin) {
      if (err) {
        return next(err);
      }

      // If user is not unique, return error
      if (existingAdmin) {
        return res.status(422).send(
          {error: 'That username is already in use.'});
      }

      var admin = new Admin({
        username,
        password
      });

      admin.save(function(err, admin) {
        if (err) {
          return next(err);
        }

        // Respond with JWT if user was created
        var adminInfo = setUserInfo(admin);

        res.status(201).json({
          token: `JWT ${generateToken(adminInfo)}`,
          user: adminInfo
        });
      });
    });
  });

  authRoutes.post('/info', requireAuth, function(req, res) {
    return res.status(201).json({role: req.user.role});
  });

  // Data
  apiRoutes.get('/users', (req, res) =>
    User.find({deleted: {$ne: true}}).sort({createdAt: -1})
    .exec(function(err, users) {
      return res.json(users);
    })
  );

  // Index
  adminRoutes.get('/*', function response(req, res) {
    return res.render('pages/admin/home');
  });
};
