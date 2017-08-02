// App Routes
module.exports = function(app, config) {
  var User = require('../entities/users/model');

  require('express-jwt')({
    secret: config.USER_SECRET,
    userProperty: 'payload'
  });

  // Basic
  app.get('/', (req, res) => res.render('pages/home.pug'));
  app.get('/login', (req, res) => res.render('pages/user/home.pug'));
  app.get('/logout', (req, res) => res.render('pages/user/home.pug'));

  require('./apply')(app, config);

  // Actual confirmation (link for people who just got selected)
  app.get('/accepted', (req, res) => res.render('pages/accepted.pug'));

  // Email confirm
  app.get('/confirm/:id', (req, res) =>
    // Confirm the email
    User.update({'_id': req.params.id}, {confirmed: true}, function(err) {
      if (err) {
        res.status(500);
        return res.render('error.pug', {error: 'User does not exist'});
      }

      // Redirect to the profile
      return res.redirect('/login#confirmed');
    })
  );

  require('./live')(app, config);

  // Development Hot-Middleware
  if (config.NODE_ENV === 'development') {
    const webpack = require('webpack');
    const webpackConfig = require('../webpack.config.js');

    const compiler = webpack(webpackConfig);
    app.use(require('webpack-dev-middleware')(compiler, {
      hot: false,
      publicPath: webpackConfig.output.publicPath,
      stats: {
        colors: true,
        hash: false,
        timings: true,
        chunks: false,
        chunkModules: false,
        modules: false
      }
    }));

    app.use(require('webpack-hot-middleware')(compiler, {
      publicPath: '/',
    }));
  }
};
