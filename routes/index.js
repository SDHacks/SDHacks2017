// App Routes
export default function(app, config) {
  let User = require('../entities/users/model');

  let auth = require('express-jwt')({ secret: config.USER_SECRET, 
    userProperty: 'payload' });

  // Basic
  app.get('/', (req, res) => res.render('home.jade'));

  // Actual confirmation (link for people who just got selected)
  app.get('/accepted', (req, res) => res.render('accepted.jade'));

  // Email confirm
  app.get('/confirm/:id', (req, res) =>
    // Confirm the email
    User.update({ '_id': req.params.id }, { confirmed: true }, function(err, user) {
      if (err) {
        res.status(500);
        return res.render('error.jade', { error: 'User does not exist' });
      }

      // Redirect to the profile
      return res.redirect(`/users/${req.params.id}`);
    })
  );

  let loadLivePage = function(req, res) {
    let menu = {
      'updates': {
        'name': 'Updates',
        'url': '/live'
      },
      'prizes': {
        'name': 'Prizes',
        'url': '/live/prizes'
      },
      'schedule': {
        'name': 'Schedule',
        'url': '/live#schedule'
      },
      'hardware': {
        'name': 'Hardware',
        'url': '//hardware.mlh.io/',
        'target': '_blank'
      },
      'helpq': {
        'name': 'HelpQ',
        'url': '//mentor.sdhacks.io',
        'target': '_blank'
      },
      'devpost': {
        'name': 'Devpost',
        'url': '//sdhacks2016.devpost.com',
        'target': '_blank'
      },
      'discord': {
        'name': 'Discord',
        'url': '//discord.gg/zHC3Jpz',
        'target': '_blank'
      }
    };
    return res.render(`live/${req.params.page}.jade`, 
      { page: req.params.page, menu });
  };

  // Live site (index)
  app.get('/live', function(req, res) {
    req.params.page = 'index';
    return loadLivePage(req, res);
  });

  // Live site (other pages)
  return app.get('/live/:page', loadLivePage);
};
