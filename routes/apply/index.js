const express = require('express');

module.exports = function(app, config) {
  const applyRoutes = express.Router();
  const apiRoutes = express.Router();

  app.use('/apply', applyRoutes);
  applyRoutes.use('/api', apiRoutes);

  require('./api')(apiRoutes, config);

  // Index
  applyRoutes.get('/*', function response(req, res) {
    return res.render('pages/apply/home');
  });
};
