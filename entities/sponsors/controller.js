module.exports = function(app, config) {
  var generatePassword = require('password-generator');
  var bcrypt = require('bcrypt');
  var moment = require('moment');
  var uuid = require('node-uuid');
  var S3Archiver = require('s3-archiver');
  var fs = require('fs');
  var csv = require('fast-csv');

  var zipper = new S3Archiver({
    accessKeyId: config.S3_KEY,
    secretAccessKey: config.S3_SECRET,
    region: 'us-west-1',
    bucket: config.S3_BUCKET
  }, {
    folder: 'resumes',
    filePrefix: 'resumes/'
  });

  // Model and Config
  var Sponsor = require('./model');
  var User = require('../users/model');

  var passwordLength = 16;
  var saltRounds = 10;

  var exportApplicantInfo = function(users, archive, finalize) {
    var csvStream = csv.format({headers: true});

    var fileName = __dirname + '/' + process.hrtime()[1] + '.csv';
    //Create a new CSV with the timestamp to store the user information
    var writableStream = fs.createWriteStream(fileName);
    csvStream.pipe(writableStream);

    for (var user of Array.from(users)) {
      csvStream.write({
        firstName: user.firstName,
        lastName: user.lastName,
        graduationYear: user.year,
        university: user.university,
        gender: user.gender,
        status: user.status,
        website: user.website,
        github: user.github,
        resumeFile: user.resume.name,
        resumeLink: user.resume.url
      });
    }

    //Wait until the CSV file is written
    writableStream.on('finish', function() {
      console.log('Wrote user CSV file');

      //Append file to the zip
      archive.append(fs.createReadStream(fileName), {name: 'applicants.csv'});

      //Finish the process
      finalize();
      return fs.unlink(fileName);
    });

    return csvStream.end();
  };

  var auth = function(req, res, next) {
    var unauthorized = function(res) {
      res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
      return res.sendStatus(401);
    };

    var user = require('basic-auth')(req);

    if (!user || !user.name || !user.pass) {
      return unauthorized(res);
    }
    if ((user.name === config.ADMIN_USER) &&
      (user.pass === config.ADMIN_PASS)) {
      return next();
    }
    return unauthorized(res);
  };

  var sponsorAuth = function(req, res, next) {
    var unauthorized = function(res) {
      res.set('WWW-Authenticate',
        'Basic realm=Sponsor Authentication Required');
      return res.sendStatus(401);
    };

    var user = require('basic-auth')(req);

    if (!user || !user.name || !user.pass) {
      return unauthorized(res);
    }
    req.params.username = user.name; //Store the sponsor name in params

    Sponsor.findOne({'login.username': user.name, deleted: {$ne: true}},
      function() {});
    if (err || (typeof sponsor === 'undefined' || sponsor === null)) {
      return unauthorized(res);
    }

    return bcrypt.compare(user.pass, sponsor.login.password,
      function(err, result) {
        if (err || !result) {
          return unauthorized(res);
        }
        req.sponsor = sponsor;
        return next();
      });
  };

  // Show
  app.get('/sponsors', sponsorAuth, (req, res) =>
    Sponsor.findOne({'login.username': req.params.username},
      function(e, sponsor) {
        if (e || (sponsor == null)) {
          return res.redirect('/');
        }

        return res.render('entity_views/sponsors/show.pug', {sponsor});
      })
);

  // Admin
  app.get('/sponsors/admin', auth, function(req, res) {
    Sponsor.find({deleted: {$ne: true}}).sort({createdAt: -1})
      .exec(function(err, sponsors) {
        return res.render('entity_views/sponsors/admin.pug', {sponsors});
      });
  });

  // Create
  app.post('/sponsors/create', auth, function(req, res) {
    if ((req.body.companyName == null) || (req.body.login == null)) {
      res.status(400);
      return res.json({'error': true});
    }

    var newSponsor = new Sponsor({companyName: req.body.companyName});
    var generatedPw = generatePassword(passwordLength, false);

    return bcrypt.hash(generatedPw, saltRounds, function(err, hash) {
      if (err || (hash == null)) {
        res.status(400);
        return res.json({'error': true});
      }

      var username = req.body.login.toLowerCase().replace(/\s+/g, '');
      newSponsor.login = {
        username,
        password: hash
      };
      return newSponsor.save(function(err, sponsor) {
        if (err) {
          res.status(400);
          return res.json({'error': true});
        }

        return res.json({'sponsor': sponsor, 'password': generatedPw});
      });
    });
  });

  app.post('/sponsors/applicants/download', sponsorAuth, (req, res) =>
    // Get the list of applicant IDs
    User.find({_id: {$in: req.body.applicants}}).exec(function(err, users) {
      if (err || (users.length === 0)) {
        return res.json({'error': true});
      }

      // Create a list of file names to filter by
      var fileNames = users.filter(user =>
        // Ensure a resume has been uploaded
        (user.resume != null) && (user.resume.name != null)).map(user =>
        // Map the names of the resumes
        `resumes/${user.resume.name}`
      );

      var fileName = req.params.username + '-' +
        moment().format('YYYYMMDDHHmmss') + '-' +
        generatePassword(12, false, /[\dA-F]/) + '.zip';

      var downloadId = uuid.v1();
      res.json({'zipping': downloadId});
      console.log('Zipping started for ', fileNames.length, 'files');

      zipper.localConfig.finalizing = (archive, finalize) =>
        exportApplicantInfo(users, archive, finalize);

      return zipper.zipFiles(fileNames, `downloads/${fileName}`, {
        ACL: 'public-read'
      }, function(err, result) {
        var download = {download_id: downloadId};
        if (err) {
          console.error(err);
          download.error = true;
        } else {
          download.url = result.Location;
        }
        req.sponsor.downloads.push(download);
        return req.sponsor.save();
      });
    })
  );

  app.get('/sponsors/download/:id', sponsorAuth, function(req, res) {
    var download = req.sponsor.downloads.filter(download =>
      download.download_id === req.params.id).pop();
    if (download === undefined) {
      return res.json({'error': true});
    }
    return res.json({url: download.url});
  });

  // Destroy
  return app.get('/sponsors/:id/delete', auth, (req, res) =>
    Sponsor.findById(req.params.id, function(e, sponsor) {
      if (e) {
        res.status(401);
        res.json({'error': 'Sponsor not found'});
      }
      return sponsor.softdelete(function(err, newSponsor) {
        newSponsor.save();
        return res.json({'success': true});
      });
    })
  );
};
