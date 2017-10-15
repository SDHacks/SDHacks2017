const express = require('express');

module.exports = function(app, config) {
  const liveRoutes = express.Router();

  app.use('/live', liveRoutes);

  // Index
  liveRoutes.get('/*', function response(req, res) {
    return res.render('pages/live/home');
  });
};
