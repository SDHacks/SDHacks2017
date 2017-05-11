// Redirect Routes
module.exports = function(app) {
  var expoRedirect = (req, res) =>
    res.redirect('http://expo.sdhacks.io');

  var tablesRedirect = (req, res) =>
    res.redirect('http://expo.sdhacks.io');

  app.get('/expo', expoRedirect);
  app.get('/tables', tablesRedirect);
};
