// Webpack Serving
module.exports = function(app) {
  const webpack = require('webpack');
  const config = require('../webpack.config.js');

  if (process.env.NODE_ENV === 'development') {
    const compiler = webpack(config);
    app.use(require('webpack-dev-middleware')(compiler, {
      hot: false,
      publicPath: config.output.publicPath,
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

  app.get('/admin', function response(req, res) {
    return res.render('admin/home');
  });
};
