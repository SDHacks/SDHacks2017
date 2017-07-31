const passport = require('passport');
const express = require('express');

const roleAuth = require('../helper').roleAuth;
const roles = require('../helper').roles;

const requireAuth = passport.authenticate('jwt', {session: false});

module.exports = function(routes, config) {
  var Admin = require('../model');
  var User = require('../../users/model');

  const userRoutes = express.Router();
  const sponsorRoutes = express.Router();

  routes.use('/users', userRoutes);
  routes.use('/sponsors', sponsorRoutes);

  require('./User')(userRoutes, config, requireAuth);
  require('./Sponsor')(sponsorRoutes, config, requireAuth);

  routes.get('/admins', requireAuth, roleAuth(roles.ROLE_DEVELOPER),
  (req, res) =>
    Admin.find({deleted: {$ne: true}}).sort({createdAt: -1})
    .exec(function(err, admins) {
      return res.json(admins);
    })
  );

  routes.get('/stats/users', requireAuth, (req, res) => {
    User.count({deleted: {$ne: true}})
    .exec((err, count) => res.json({total: count}));
  });

  routes.get('/stats/university', requireAuth, (req, res) => {
    User.distinct('university')
    .exec((err, list) => res.json({total: list.length}));
  });
};
