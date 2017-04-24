// Redirect Routes
module.exports = function(app) {
  var mentorRedirect = (req, res) =>
    res.redirect('http://bit.ly/SDHacks2017Volunteer');

  var expoRedirect = (req, res) =>
    res.redirect('http://expo.sdhacks.io');

  var tablesRedirect = (req, res) =>
    res.redirect('http://expo.sdhacks.io');

  app.get('/volunteer', mentorRedirect);
  app.get('/mentor', mentorRedirect);
  app.get('/expo', expoRedirect);
  app.get('/tables', tablesRedirect);
};
