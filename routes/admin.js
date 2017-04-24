// Webpack Serving
module.exports = function(app, config) {
  if (process.env.NODE_ENV === 'development') {
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

  var auth = function(req, res, next) {
    var unauthorized = function(res) {
      res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
      return res.sendStatus(401);
    };

    var user = require('basic-auth')(req);

    if (!user || !user.name || !user.pass) {
      return unauthorized(res);
    }
    if ((user.name === config.ADMIN_USER) &&
      (user.pass === config.ADMIN_PASS)) {
        return next();
    }
    return unauthorized(res);
  };

  var User = require('../entities/users/model');

  app.get('/admin', auth, function response(req, res) {
    return res.render('admin/home');
  });

  app.get('/admin/users', auth, (req, res) =>
    User.find({deleted: {$ne: true}}).sort({createdAt: -1})
    .exec(function(err, users) {
      return res.json(users);
    })
  );
};
