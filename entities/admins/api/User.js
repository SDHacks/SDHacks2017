const roleAuth = require('../helper').roleAuth;
const roles = require('../helper').roles;

module.exports = function(routes, config, requireAuth) {
  var User = require('../../users/model');

  routes.get('/', requireAuth, roleAuth(roles.ROLE_ADMIN), (req, res) =>
    User.find({deleted: {$ne: true}})
    .sort({createdAt: -1})
    .lean()
    .exec(function(err, users) {
      return res.json(users);
    })
  );

  routes.post('/:id', requireAuth, roleAuth(roles.ROLE_ADMIN),
    (req, res) => {
      if (req.body._id !== req.params.id) {
        return res.json({error: 'Parameter id does not match object _id'});
      }
      User.findOneAndUpdate({_id: req.params.id}, req.body, function(err){
        if (err) {
          return res.status(501).json({error: true});
        }
        return res.status(200).json({success: true});
      });
    });

  routes.post('/checkin', (req, res) =>
    User.update({email: req.body.email}, {$set: {'checkedIn': true}})
    .exec(function(err) {
      if (err) {
        return res.json({'error': true});
      }
      return res.json({'success': true});
    })
  );

  // Destroy
  routes.get('/:id/delete', requireAuth, roleAuth(roles.ROLE_ADMIN),
  (req, res) =>
    User.findById(req.params.id, function(e, user) {
      if (e) {
        res.status(400);
        res.json({'error': 'User not found'});
      }
      return user.softdelete(function(err, newUser) {
        newUser.save();
        return res.json({'success': true});
      });
    })
  );

  routes.get('/:id/unwaitlist', requireAuth, roleAuth(roles.ROLE_ADMIN),
  (req, res) =>
    User.findById(req.params.id, function(e, user) {
      if (e) {
        res.status(400);
        res.json({'error': 'User not found'});
      }
      if (user.status === 'Waitlisted') {
        user.status = 'Unconfirmed';
      }
      user.save();
      return res.json({'success': true});
    })
  );
};
