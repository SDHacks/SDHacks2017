const passport = require('passport');

const roleAuth = require('./helper').roleAuth;
const roles = require('./helper').roles;

module.exports = function(routes) {
  var Admin = require('./model');
  var User = require('../users/model');

  const requireAuth = passport.authenticate('jwt', {session: false});

  routes.get('/users', requireAuth, roleAuth(roles.ROLE_ADMIN), (req, res) =>
    User.find({deleted: {$ne: true}}).sort({createdAt: -1})
    .exec(function(err, users) {
      return res.json(users);
    })
  );

  routes.get('/stats', requireAuth, (req, res) => {
    User.count({deleted: {$ne: true}})
    .exec((err, count) => res.json({totalUsers: count}));
  });
};
