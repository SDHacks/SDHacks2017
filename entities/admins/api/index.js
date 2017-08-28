const passport = require('passport');
const express = require('express');

const roleAuth = require('../helper').roleAuth;
const roles = require('../helper').roles;

const requireAuth = passport.authenticate('adminJwt', {session: false});

module.exports = function(routes, config) {
  var Admin = require('../model');
  var User = require('../../users/model');

  const userRoutes = express.Router();
  const sponsorRoutes = express.Router();
  const adminRoutes = express.Router();

  routes.use('/users', userRoutes);
  routes.use('/sponsors', sponsorRoutes);
  routes.use('/admins', adminRoutes);

  require('./User')(userRoutes, config, requireAuth);
  require('./Sponsor')(sponsorRoutes, config, requireAuth);

  adminRoutes.get('/', requireAuth, roleAuth(roles.ROLE_DEVELOPER),
  (req, res) =>
    Admin.find({deleted: {$ne: true}}).sort({createdAt: -1})
    .exec(function(err, admins) {
      return res.json(admins);
    })
  );

  adminRoutes.post('/register', requireAuth, roleAuth(roles.ROLE_DEVELOPER),
  (req, res) =>
    Admin.create(req.body, (err) => {
      if (err) {
        console.error(err);
        console.log(Admin.schema.path('role').enumValues);
        return res.json({error: true});
      }
      res.json({success: true});
    })
  );

  adminRoutes.post('/delete', requireAuth, roleAuth(roles.ROLE_DEVELOPER),
  (req, res) =>
    Admin.delete({_id: req.body.id}, (err) => {
      if (err) {
        return res.json({error: true});
      }
      res.json({success: true});
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
