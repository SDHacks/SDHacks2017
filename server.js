'use strict';
var http = require('http');
var path = require('path');

var bodyParser = require('body-parser');
var compression = require('compression');
var cookieParser = require('cookie-parser');
var device = require('express-device');
var errorHandler = require('errorhandler');
var express = require('express');
var favicon = require('serve-favicon');
var flash = require('connect-flash');
var helmet = require('helmet');
var logger = require('morgan');
var methodOverride = require('method-override');
var passport = require('passport');
var staticDir = require('serve-static');
var throng = require('throng');

require('dotenv').config({silent: process.env.NODE_ENV !== 'development'});

var WORKERS = process.env.WEB_CONCURRENCY || 1;

//Create workers on all the threads
if (process.env.NODE_ENV === 'development') {
  // Don't multithread for debugging ease
  start();
} else {
  throng({
    workers: WORKERS,
    lifetime: Infinity
  }, start);
}

// The application
function start() {
  var app = express();
  var port = process.env.PORT || 3000;
  app.listen(port);

  require('./routes/redirects')(app);
  app.use(helmet());
  app.use(compression());

  app.configure('production', function () {
    app.use(function (req, res, next) {
      if (req.headers['x-forwarded-proto'] !== 'https') {
        return res.redirect(['https://', req.hostname, req.url].join(''));
      }
      return next();
    });
  });

  // Extras
  // Rendering tools
  app.locals.moment = require('moment');

  // all environments
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'pug');
  app.use(favicon(path.join(__dirname, 'static/assets/img/favicon.png')));
  if (process.env.NODE_ENV === 'development') {
    app.use(logger('dev'));
  } else {
    app.use(logger('common', {
      skip: function (req, res) {
        return res.statusCode < 400;
      }
    }));
  }
  app.use(cookieParser());
  app.use(bodyParser.json({type: 'application/json', limit: '50mb'}));
  app.use(device.capture());
  app.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb',
    parameterLimit: 3000
  }));

  app.use(passport.initialize());
  require('./config/passport');
  app.use(flash());
  app.use(methodOverride('X-HTTP-Method-Override'));
  app.use(staticDir(path.join(__dirname, 'static')));

  // Routing
  require('./routes/index')(app, process.env);
  require('./routes/models')(app, process.env);

  // Error Handling
  // Development only
  if (process.env.NODE_ENV === 'development') {
    app.use(errorHandler());
  } else {
    // 404
    app.use(function(req, res) {
      res.sendStatus(404);
    });

    // 500
    app.use(function(err, req, res) {
      res.sendStatus(500);
    });
  }

  http.createServer(app).listen(app.get(port), function(){
    console.log('Express server listening on port ' + port + ' on ' +
      WORKERS + ' worker(s)');
  });
}
