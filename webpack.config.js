'use strict';

var path = require('path');

var webpack = require('webpack');

module.exports = {
  devtool: 'eval-source-map',
  entry: [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client?timeout=2000&path=/__webpack_hmr',
    path.join(__dirname, 'static/app/main.js'),
  ],
  output: {
    path: path.join(__dirname, '/static/assets/dist'),
    filename: '[name].js',
    publicPath: '/assets/dist/',
    hotUpdateChunkFilename: 'hot/hot-update.js',
    hotUpdateMainFilename: 'hot/hot-update.json'
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery',
      jquery: 'jquery'
    })
  ],
  resolve: {
    alias: {
      '~': path.join(__dirname, '/static/app')
    }
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader',
        options: {
          'presets': ['react', 'es2015', 'stage-0', 'react-hmre']
        }
      }]
    }, {
      test: /\.json?$/,
      loader: 'json-loader'
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }, {
      include: /\.pug/,
      loader: ['raw-loader', 'pug-html-loader']
    }]
  }
};
