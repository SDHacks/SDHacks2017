'use strict';

var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: [
    path.join(__dirname, 'static/app/main.js'),
  ],
  output: {
    path: path.join(__dirname, '/static/assets/dist'),
    filename: '[name].js',
    publicPath: '/assets/dist/'
  },
  plugins:[
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
          screw_ie8: true,
          keep_fnames: true
      },
      compress: {
          screw_ie8: true
      },
      comments: false
    })
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: [{
        loader: 'react-hot-loader'
      }, {
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
      loader: 'style-loader!css?modules&localIdentName=[name]---[local]---[hash:base64:5]'
    }, {
      include: /\.pug/,
      loader: ['raw-loader', 'pug-html-loader']
    }]
  }
};
