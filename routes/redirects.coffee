# Redirect Routes
module.exports = (app) ->
  mentorRedirect = (req, res) ->
    res.redirect 'http://bit.ly/SDHacks2016Volunteer'

  expoRedirect = (req, res) ->
    res.redirect 'http://expo.sdhacks.io'

  tablesRedirect = (req, res) ->
    res.redirect 'http://expo.sdhacks.io'

  app.get '/volunteer', mentorRedirect
  app.get '/mentor', mentorRedirect
  app.get '/expo', expoRedirect
  app.get '/tables', tablesRedirect
