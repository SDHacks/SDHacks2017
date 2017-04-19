// Redirect Routes
export default function(app) {
  let mentorRedirect = (req, res) =>
    res.redirect('http://bit.ly/SDHacks2016Volunteer');

  let expoRedirect = (req, res) =>
    res.redirect('http://expo.sdhacks.io');

  let tablesRedirect = (req, res) =>
    res.redirect('http://expo.sdhacks.io');

  app.get('/volunteer', mentorRedirect);
  app.get('/mentor', mentorRedirect);
  app.get('/expo', expoRedirect);
  return app.get('/tables', tablesRedirect);
};
