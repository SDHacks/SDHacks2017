module.exports = function(app, config, referTeammates) {

  // Model and Config
  var User = require('./model');

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

  var checkinAuth = function(req, res, next) {
    var unauthorized = function(res) {
      res.set('WWW-Authenticate', 'Basic realm=Checkin Authorization Required');
      return res.sendStatus(401);
    };

    var user = require('basic-auth')(req);

    if (!user || !user.name || !user.pass) {
      return unauthorized(res);
    }
    if ((user.name === config.CHECKIN_USER) &&
      (user.pass === config.CHECKIN_PASS)) {
        return next();
    }
    return unauthorized(res);
  };

  // Admin
  app.get('/users/admin', auth, (req, res) =>
    User.find({deleted: {$ne: true}}).sort({createdAt: -1})
    .exec(function(err, users) {
      var statuses = {};
      for (var user of Array.from(users)) {
        if (statuses[user.status]) {
          statuses[user.status]++;
        } else {
          statuses[user.status] = 1;
        }
      }
      return res.render('entity_views/users/admin.pug',
        {users, statusCounts: statuses});
    })
  );

  app.get('/users/admin/waitlist', auth, (req, res) =>
    User.find({deleted: {$ne: true}, status: 'Waitlisted'})
    .sort({createdAt: 1}).exec((err, users) =>
      res.render('entity_views/users/waitlist.pug', {users}))
  );

  app.get('/users/admin/checkin', checkinAuth, (req, res) =>
    User.find({deleted: {$ne: true}, status: 'Confirmed'})
    .exec((err, users) => res.render('entity_views/users/checkin.pug',
      {users}))
  );

  app.post('/users/admin/checkin', checkinAuth, (req, res) =>
    User.update({email: req.body.email}, {$set: {'checkedIn': true}})
    .exec(function(err) {
      if (err) {
        return res.json({'error': true});
      }
      return res.json({'success': true});
    })
  );

  // Show
  app.get('/users/:id', (req, res) =>
    User.findById(req.params.id, function(e, user) {
      if (e || (user === null)) {
        res.redirect('/');
      }
      return res.render('entity_views/users/show', {user});
    })
  );

  // Destroy

  app.get('/users/:id/delete', auth, (req, res) =>
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

  app.get('/users/:id/unwaitlist', auth, (req, res) =>
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

  // Edit
  app.post('/users/:id/edit', function(req, res) {
    var trackEdit = (user, field, from, to) =>
      console.log(`/users/edit: User '${user.firstName} ${user.lastName} 
        changed field ${field} from ${from} to ${to}`);
    ;
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
          referTeammates(user, req);
        }
        return res.send(originalValue);
      });
    });
  });

  return app.get('/users/:id/accept', (req, res) =>
    User.findById(req.params.id, function(e, user) {
      if (e || (user === null)) {
        return res.redirect('/');
      }

      if ((user.status !== 'Unconfirmed') && (user.status !== 'Waitlisted') &&
      (user.status !== 'Confirmed')) {
        console.error('Someone has tried to edit their status');
        return res.json({'error': true});
      }

      if (req.query.status === 'false') {
        user.status = 'Declined';
      } else {
        user.status = 'Confirmed';
        if (req.query.bus && (req.query.bus === 'true')) {
          user.bussing = true;
        }
      }

      user.save();

      return res.json({'success': true});
    })
  );
};
