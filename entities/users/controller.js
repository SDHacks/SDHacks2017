const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const setUserInfo = require('./helper').setUserInfo;

module.exports = function(app, config) {

  // Model and Config
  var User = require('./model');

  const userRoutes = express.Router();
  const apiRoutes = express.Router();

  app.use('/user', userRoutes);
  userRoutes.use('/api', apiRoutes);

  require('./api')(apiRoutes, config);

  // Middleware to require login/auth
  const requireLogin = passport.authenticate('user', {session: false});

  /**
   * Signs a user with the JWT secret.
   * @param {Object} user The public user information to sign.
   * @returns {String} The JWT token signed for that user.
   */
  function generateToken(user) {
    return jwt.sign(user, config.SESSION_SECRET, {
      expiresIn: 10080
    });
  }

  // Authentication
  userRoutes.post('/login', requireLogin, function (req, res) {
    var userInfo = setUserInfo(req.user);

    res.status(200).json({
      token: `JWT ${generateToken(userInfo)}`,
      user: userInfo
    });
  });

  userRoutes.get('/:id/accept', (req, res) =>
    User.findById(req.params.id, function(e, user) {
      if (e || (user === null)) {
        return res.redirect('/');
      }

      if ((user.status !== 'Unconfirmed') && (user.status !== 'Waitlisted') &&
      (user.status !== 'Confirmed')) {
        console.error('Someone has tried to edit their status');
        return res.json({'error': true});
      }

      if (req.query.status === 'false') {
        user.status = 'Declined';
      } else {
        user.status = 'Confirmed';
        if (req.query.bus && (req.query.bus === 'true')) {
          user.bussing = true;
        }
      }

      user.save();

      return res.json({'success': true});
    })
  );

  userRoutes.get('/*', function response(req, res) {
    return res.render('pages/user/home');
  });
};
