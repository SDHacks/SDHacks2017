// Webpack Serving
module.exports = function(app) {
  const webpack = require('webpack');
  const webpackMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const config = require('../webpack.config.js');

  if (process.env.NODE_ENV === 'development') {
    const compiler = webpack(config);
    const middleware = webpackMiddleware(compiler, {
      publicPath: config.output.publicPath,
      contentBase: 'src',
      stats: {
        colors: true,
        hash: false,
        timings: true,
        chunks: false,
        chunkModules: false,
        modules: false
      }
    });

    app.use(middleware);
    //app.use(webpackHotMiddleware(compiler));
  } else {
    app.use(express.static(__dirname + '/static/assets/dist'));
  }
  app.get('/admin', function response(req, res) {
    return res.render('admin/home');
  });
};