var crypto = require('crypto');

const passport = require('passport');
var multer = require('multer');
var mime = require('mime');

const requireAuth = passport.authenticate('userJwt', {session: false});

const editableFields = [
  'teammates', 'food', 'diet', 'travel', 'shirtSize', 'github', 'website',
  'resume', 'shareResume', 'gender'
];

const readOnlyFields = [
  'status', 'firstName', 'lastName', 'university', 'email', 'phone'
];

var storage = multer.diskStorage({
  dest: 'public/uploads/',
  filename(req, file, cb) {
    return crypto.pseudoRandomBytes(16, (err, raw) =>
      cb(null, raw.toString('hex') + '.' + mime.extension(file.mimetype)));
  }
});

var upload = multer({
  storage,
  //5MB file size
  limits: {fileSize: 5 * 1024 * 1024}
});

module.exports = function(routes, config) {
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
};
