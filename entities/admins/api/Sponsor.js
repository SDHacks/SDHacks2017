const fs = require('fs');

const csv = require('fast-csv');
const generatePassword = require('password-generator');
const moment = require('moment');
const uuid = require('node-uuid');
const S3Archiver = require('s3-archiver');

const roleAuth = require('../helper').roleAuth;
const roles = require('../helper').roles;

module.exports = function(routes, config, requireAuth) {
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
  var User = require('../../users/model');

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

  routes.get('/applicants', requireAuth, roleAuth(roles.ROLE_SPONSOR),
  (req, res) => {
    // Select the fields necessary for sorting and searching
    return User.find(
      {
        deleted: {$ne: true},
        confirmed: true,
        shareResume: true,
        resume: {$exists: true},
        'resume.size': {$gt: 0},
        sanitized: true
      },
      'firstName lastName university year gender major resume.url')
      .exec(function(err, users) {
        if (err || (users == null)) {
          return res.json({'error': 'No users were found'});
        }

        return res.json(users);
      });
  });

  routes.post('/applicants/download', requireAuth,
  roleAuth(roles.ROLE_SPONSOR), (req, res) =>
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
        var download = {downloadId: downloadId};
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

  routes.get('/applicants/download/:id', requireAuth,
  roleAuth(roles.ROLE_SPONSOR), function(req, res) {
    var download = req.sponsor.downloads.filter(download =>
      download.downloadId === req.params.id).pop();
    if (download === undefined) {
      return res.json({'error': true});
    }
    return res.json({url: download.url});
  });
};
