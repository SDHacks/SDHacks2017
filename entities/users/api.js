const passport = require('passport');

const requireAuth = passport.authenticate('userJwt', {session: false});

const editableFields = [
  'firstName', 'lastName', 'university', 'email', 'phone', 'teammates',
  'food', 'diet', 'travel', 'shirtSize', 'github', 'website', 'resume',
  'shareResume', 'gender'
];

module.exports = function(routes, config) {
  routes.get('/current', requireAuth, function(req, res) {
    var user = req.user;
    var outputUser = {};
    editableFields.forEach(function(field) {
      outputUser[field] = user[field];
    });
    return res.json(outputUser);
  });

  // Edit
  routes.post('/edit', requireAuth, function(req, res) {
    var trackEdit = (user, field, from, to) =>
      console.log(`/users/edit: User '${user.firstName} ${user.lastName} 
        changed field ${field} from ${from} to ${to}`);
    return User.findById(req.params.id, function(e, user) {
      if (e || (user === null)) {
        res.status(400);
        return res.json({'error': 'User not found'});
      }
      if (!req.body.id) {
        res.status(500);
        return res.json({'error': 'Something went wrong in the request'});
      }

      // Make rules for certain fields
      var originalValue = req.body.value;
      var sendReferral = false;

      // Teammates
      if (req.body.id.indexOf('teammate') === 0) {
        var teammateId = req.body.id.slice(-1);
        trackEdit(user, req.body.id, user.teammates[teammateId],
          req.body.value);
        // Ensure they're not adding a new email
        if (user.teammates[teammateId] === undefined) {
          user.teammates.push(req.body.value);
        } else {
          user.teammates[teammateId] = req.body.value;
        }
        user.markModified('teammates');
        sendReferral = true;

      } else if (req.body.id === 'major') {
        trackEdit(user, 'majors', user.majors, req.body.value);
        user.majors = [req.body.value];
      } else if (req.body.id === 'travel') {
        user.travel.outOfState = (req.body.value !== 'San Diego');
        trackEdit(user, 'city', user.travel.city, req.body.value);
        user.travel.city = req.body.value;
      } else {
        trackEdit(user, req.body.id, user[req.body.id], req.body.value);
        user[req.body.id] = req.body.value;
      }

      return user.save(function(err) {
        if (err) {
          res.status(500);
          console.error('Error editing user data');
          return res.json({'error': 'Something went wrong in the database'});
        }

        if (sendReferral) {
          // TODO: Outsource referral system
          // referTeammates(user, req);
        }
        return res.send(originalValue);
      });
    });
  });
};
