const passport = require('passport');

const roleAuth = require('./helper').roleAuth;
const roles = require('./helper').roles;

module.exports = function(routes, config) {
  var Admin = require('./model');
  var User = require('../users/model');

  const requireAuth = passport.authenticate('jwt', {session: false});

  routes.get('/users', requireAuth, roleAuth(roles.ROLE_ADMIN), (req, res) =>
    User.find({deleted: {$ne: true}})
    .sort({createdAt: -1})
    .lean()
    .exec(function(err, users) {
      return res.json(users);
    })
  );

  routes.get('/admins', requireAuth, roleAuth(roles.ROLE_DEVELOPER),
  (req, res) =>
    Admin.find({deleted: {$ne: true}}).sort({createdAt: -1})
    .lean()
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

  routes.get('/sponsors/applicants', requireAuth, roleAuth(roles.ROLE_SPONSOR),
  (req, res) => {
    // Get the most recent date for sanitized users
    var sanitizedDate = config.RESUME_SANITIZED;
    // Select the fields necessary for sorting and searching
    return User.find(
      {
        deleted: {$ne: true},
        confirmed: true,
        shareResume: true,
        categories: {$exists: true},
        resume: {$exists: true},
        'resume.size': {$gt: 0},
        createdAt: {$lte: sanitizedDate},
        checkedIn: true
      }, 'university categories year gender status')
      .lean()
      .exec(function(err, users) {
        if (err || (users == null)) {
          res.status(401);
          return res.json({'error': true});
        }

        return res.json(users);
      });
  });
};
