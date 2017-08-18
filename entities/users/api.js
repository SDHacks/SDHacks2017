const passport = require('passport');

const requireAuth = passport.authenticate('userJwt', {session: false});

const editableFields = [
  'teammates', 'food', 'diet', 'travel', 'shirtSize', 'github', 'website',
  'resume', 'shareResume', 'gender'
];
const readOnlyFields = [
  'status', 'firstName', 'lastName', 'university', 'email', 'phone'
];

module.exports = function(routes, config) {
  const upload = require('../../config/uploads')(config);
  const {forgotSender} = require('../../config/mailer')(config);

  var User = require('./model');

  function outputCurrentUser(user) {
    var outputUser = {};
    [... editableFields, ...readOnlyFields].forEach(function(field) {
      outputUser[field] = user[field];
    });
    return outputUser;
  }

  routes.get('/current', requireAuth, function(req, res) {
    var user = req.user;
    return res.json(outputCurrentUser(user));
  });

  routes.post('/update', upload.single('resume'), requireAuth,
  function(req, res) {
    var user = req.user;
    const delta = req.body;
    console.log(`User ${user._id} has updated ${Object.keys(delta).length}
      fields in their profile`);

    // Ensure final delta is only editing editable fields.
    var updateDelta = {};
    Object.keys(delta).forEach(function(field) {
      if (editableFields.indexOf(field) !== -1) {
        updateDelta[field] = delta[field];
      }
    });

    return User.findByIdAndUpdate({_id: user._id}, {$set: updateDelta},
    {new: true}, function(e, user) {
      if (e || (user === null)) {
        return res.json({'error': 'Unable to update user'});
      }

      if (req.file) {
        return user.attach('resume', {path: req.file.path}, function(error) {
          if (error) {
            return res.json({'error':
              'There was an error updating your resume'});
          }
          return res.json(outputCurrentUser(user));
        });
      }

      return res.json(outputCurrentUser(user));
    });
  });

  routes.post('/forgot', function(req, res) {
    if (!req.body.email) {
      return res.json({error: 'No email was sent'});
    }

    return User.findOne({email: req.body.email}, function(e, user) {
      if (e || user === null) {
        return res.json({error: 'No user found by that email'});
      }

      return forgotSender({
        to: user.email,
        subject: 'Your Password has been Reset!'
      }, {
        'user': user
      },
      function(err) {
        if (err) {
          console.error(err);
          return res.json({error: 'Failed to send email'});
        }

        res.status(200);
        return res.json({success: true});
      });
    });

  });
};
