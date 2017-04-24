//Api Routes
var multer = require('multer');
var crypto = require('crypto');
var mime = require('mime');
var EmailTemplate = require('email-templates').EmailTemplate;

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

module.exports = function(app, config, transporter) {
  var User = require('../entities/users/model');

  var confirmSender = transporter.templateSender(
    new EmailTemplate('./views/emails/confirmation'),
    {
      from: {
        name: 'SD Hacks Team',
        address: process.env.MAIL_USER
      }
    });

  var referSender = transporter.templateSender(
    new EmailTemplate('./views/emails/refer'),
    {
      from: {
        name: 'SD Hacks Team',
        address: process.env.MAIL_USER
      }
    });

  var referTeammates = (user, req) =>
    // Queue up the referall emails
    Array.from(user.teammates).map((referral) =>
      (referral =>
        User.count({email: referral}, function(err, c) {
          if ((err === null) && (c < 1)) {
            return referSender({
              to: referral,
              subject: user.firstName + '\'s invitation to SD Hacks 2017'
            }, {
              'user': user,
              'referUrl': req.protocol + '://' + req.get('host')
            });
          }
      })
      )(referral))
  ;

  app.post('/api/upload', upload.single('resume'), function(req, res) {
    var userError = function() {
      res.status(400);
      return res.json({'error': true});
    };

    if (!req.body.user_id || !req.file) {
      return userError();
    }

    return User.findById(req.body.user_id, function(e, user) {
      if (e || (user === null)) {
        return userError();
      }

      return user.attach('resume', {path: req.file.path}, function(error) {
        if (error) {
          console.error(error);
          console.error('Failed to upload new user resume');
          userError();
        }

        user.save();
        return res.json({'url': user.resume.url});
    });
  });
});

  app.post('/api/register', upload.single('resume'), function(req, res) {
    var user = new User;

    //Form validation

    req.body.phone = req.body.phone.replace(/\D/g, '');
    if (req.body.phone.length !== 10) {
      res.status(400);
      return res.json({'error': 'Your phone number must be exactly 10 digits'});
    }

    return User.count({email: req.body.email}, function(err, count) {
      if (count > 0) {
        res.status(400);
        return res.json({'error': 'This email has already been used'});
      }

      user.firstName = req.body.firstName;
      user.lastName = req.body.lastName;
      user.birthdate = req.body.birthdate_year + '-' +
        req.body.birthdate_month + '-' + req.body.birthdate_day
        + 'T00:00:00.000Z'; // Timezone agnostic
      user.gender = req.body.gender;
      user.email = req.body.email;
      user.phone = req.body.phone;
      user.university = req.body.university;
      user.majors = [req.body.major];
      user.year = req.body.year;
      user.github = req.body.github;
      user.website = req.body.website;
      user.shareResume = req.body.shareResume;
      user.food = req.body.food;
      user.diet = req.body.diet;
      user.shirtSize = req.body.shirtFit + req.body.shirtSize;
      user.travel = {
        outOfState: req.body.outOfState,
        city: req.body.city
      };
      user.firstHackathon = req.body.firstHackathon;
      user.outcomeStmt = req.body.outcomeStmt;
      user.teammates = [];

      if (req.body.team1) {
        user.teammates.push(req.body.team1.toLowerCase());
      }
      if (req.body.team2) {
        user.teammates.push(req.body.team2.toLowerCase());
      }
      if (req.body.team3) {
        user.teammates.push(req.body.team3.toLowerCase());
      }

      var userError = function(errorMessage, code) {
        if (code == null) {
          code = 500;
        }
        res.status(code);
        return res.json({'error': errorMessage});
      };

      var saveUser = function(error) {
        if (error) {
          //Throw an error
          console.error('Failed to upload resume');
          console.log(error);
          return userError('Failed to upload resume');
        }

        return user.save(function(err) {
          if (err) {
            if (err.name === 'ValidationError') {
              for (var field in err.errors) {
                return userError(err.errors[field].message, 400);
              }
            }
            return userError('Failed due to database error');
          }

          return confirmSender({
            to: user.email,
            subject: 'Thank you for your application!'
          }, {
            'user': user,
            'confirmUrl': req.protocol + '://' + req.get('host') +
              '/confirm/' + user._id
          },
          function(err) {
            if (err) {
              return userError('Failed to send email confirmation');
            }

            res.status(200);
            res.json({'email': user.email});

            return referTeammates(user, req);
          });
        });
      };

      if (req.file) {
        return user.attach('resume', {path: req.file.path}, saveUser);
      } else {
        return saveUser(null);
      }
    });
  });

  // Imports
  require('../entities/users/controller')(app, config, referTeammates);
  require('../entities/sponsors/controller')(app, config);
};
