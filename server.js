(function() {
  'use strict';
  var bodyParser = require('body-parser');
  var cookieParser = require('cookie-parser');
  var device = require('express-device');
  var errorHandler = require('errorhandler');
  var express = require('express');
  var favicon = require('serve-favicon');
  var flash = require('connect-flash');
  var helmet = require('helmet');
  var http = require('http');
  var logger = require('morgan');
  var mailer = require('nodemailer');
  var methodOverride = require('method-override');
  var path = require('path');
  var passport = require('passport');
  var sslRedirect = require('heroku-ssl-redirect');
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
    app.use(sslRedirect());
    app.use(helmet());

    // Extras
    // Rendering tools
    app.locals.moment = require('moment');

    // Node mailer
    var transporter = mailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      }
    });

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
    app.use(bodyParser.json({type: 'application/vnd.api+json', limit: '50mb'}));
    app.use(device.capture());
    app.use(bodyParser.urlencoded({extended: true,
      limit: '50mb', parameterLimit: 3000}));

    app.use(passport.initialize());
    app.use(flash());
    app.use(methodOverride('X-HTTP-Method-Override'));
    app.use(staticDir(path.join(__dirname, 'static')));

    // Routing
    require('./routes/index')(app, process.env);
    require('./routes/api')(app, process.env, transporter);
    require('./routes/admin')(app);

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
}).call(this);
