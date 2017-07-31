module.exports = function(app, config) {
  // Imports
  require('../entities/users/controller')(app, config);
  require('../entities/admins/controller')(app, config);
};
