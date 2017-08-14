const express = require('express');

module.exports = function(app, config) {
  const liveRoutes = express.Router();

  app.use('/live', liveRoutes);

  var loadLivePage = function(req, res) {
    var menu = {
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
        'url': '//sdhacks2017.devpost.com',
        'target': '_blank'
      },
      'discord': {
        'name': 'Discord',
        'url': '//discord.gg/zHC3Jpz',
        'target': '_blank'
      }
    };
    return res.render(`pages/live/${req.params.page}.pug`,
      {page: req.params.page, menu});
  };

  liveRoutes.get('/:page', loadLivePage);

  liveRoutes.get('/', function(req, res) {
    req.params.page = 'index';
    return loadLivePage(req, res);
  });
};


