var path = require('path');

var gulp = require('gulp');
var eslint = require('gulp-eslint');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var nodemon = require('gulp-nodemon');
var plumber = require('gulp-plumber');
var esdoc = require('gulp-esdoc');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var webpackStream = require('webpack-stream');
var webpack = require('webpack');


gulp.task('default', ['package-js', 'sass', 'watch', 'nodemon']);
gulp.task('debug', ['package-js', 'sass', 'watch', 'nodemon-debug']);
gulp.task('test', ['webpack', 'sass', 'eslint', 'esdoc', 'package-js']);
gulp.task('prod', ['webpack', 'sass', 'eslint', 'package-js']);

var bowerComponentPath = 'static/assets/bower/';
var bowerComponents = [];
var components = [
  'jquery/dist/jquery.min.js',
  'bootstrap/dist/js/bootstrap.min.js',
  'jquery-ui/jquery-ui.min.js',
  'jquery-throttle-debounce/jquery.ba-throttle-debounce.min.js',
  'jquery-form-validator/form-validator/jquery.form-validator.min.js',
  'jquery-form-validator/form-validator/file.js',
  'slick-carousel/slick/slick.min.js',
  'underscore/underscore-min.js'
];
bowerComponents = components.map(function(value) {
  return path.join(bowerComponentPath, value);
});

// Handle Errors
function handleError(err) {
  gutil.log(err);
  this.emit('end');
  if (gutil.env.production) {
    process.exit(1);
  }
}

var plumberOptions = {
  errorHandler: handleError
};

// Webpack Builder
gulp.task('webpack', function() {
  gulp.src('static/app/main.js')
    .pipe(webpackStream(require('./webpack.config.prod.js'), webpack))
    .pipe(gulp.dest('static/assets/dist/'));
});

// SaSS Builder
gulp.task('sass', function () {
  gulp.src('static/assets/scss/sdhacks.scss')
    .pipe(plumber(plumberOptions))
    .pipe(sourcemaps.init())
      .pipe(sass({style:'extended'}))
      .pipe(rename({suffix: '.min'}))
      .pipe(autoprefixer('last 2 version'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('static/assets/css'));
});

// JS Linter
gulp.task('eslint', function() {
  gulp.src(['static/app/**/*.js', 'static/assets/js/*.js'])
    .pipe(plumber(plumberOptions))
    .pipe(eslint())
    .pipe(eslint.format());
});

// JS Builder
gulp.task('build-js', function() {
  gulp.src(['static/assets/js/*.js', 'static/assets/js/vendor/*.js'])
    .pipe(plumber(plumberOptions))
    .pipe(gutil.env.production ? gutil.noop() : sourcemaps.init())
      .pipe(uglify())
      .pipe(rename({suffix: '.min'}))
    .pipe(concat('app.js'))
    .pipe(gutil.env.production ? gutil.noop() : sourcemaps.write())
    .pipe(gulp.dest('static/assets/js/dist'));
});

gulp.task('package-js', function() {
  gulp.start(['build-js', 'package-bower']);
});

gulp.task('package-bower', function() {
  gulp.src(bowerComponents, {base: bowerComponentPath})
    .pipe(plumber(plumberOptions))
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('static/assets/js/dist'));
});

gulp.task('esdoc', function() {
  gulp.src(['static/app/**/*.js'], {read: false})
    .pipe(plumber(plumberOptions))
    .pipe(esdoc())
    .on('end', function() {
      gutil.log('Done!');
    });
});

// Watcher
gulp.task('watch', function() {
  gulp.watch('static/assets/scss/**/*.scss', ['sass']);
  gulp.watch(['static/assets/js/*.js', 'static/assets/js/vendor/*.js'],
    ['package-js']);
});

// Nodemon
gulp.task('nodemon', function() {
  nodemon({
    script: 'server.js',
    ext: 'js coffee',
    ignore: [
      'static/app/*.*'
    ],
    env: {'NODE_ENV': 'development'}
  });
});

gulp.task('nodemon-debug', function() {
  nodemon({
    script: 'server.js',
    ext: 'js coffee',
    ignore: [
      'static/app/*.*'
    ],
    env: {'NODE_ENV': 'development'},
    nodeArgs: ['--debug=5858', '--nolazy']
  });
});
