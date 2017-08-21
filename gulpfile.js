var gulp = require('gulp');
var eslint = require('gulp-eslint');
var sourcemaps = require('gulp-sourcemaps');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var nodemon = require('gulp-nodemon');
var plumber = require('gulp-plumber');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var webpackStream = require('webpack-stream');
var webpack = require('webpack');

gulp.task('default', ['build-js', 'sass', 'watch', 'nodemon']);
gulp.task('debug', ['build-js', 'sass', 'watch', 'nodemon-debug']);
gulp.task('test', ['webpack', 'sass', 'eslint', 'esdoc', 'build-js']);
gulp.task('prod', ['webpack', 'sass', 'eslint', 'build-js']);

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
    .pipe(gutil.env.production ? gutil.noop() : sourcemaps.init())
      .pipe(sass({style: 'compressed'}).on('error', gutil.log))
      .pipe(rename({suffix: '.min'}))
      .pipe(autoprefixer('last 2 version'))
      .pipe(cleanCSS())
    .pipe(gutil.env.production ? gutil.noop() : sourcemaps.write())
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
  gulp.src(['static/assets/js/*.js', '!static/assets/js/easter/*'])
    .pipe(plumber(plumberOptions))
    .pipe(gutil.env.production ? gutil.noop() : sourcemaps.init())
      .pipe(uglify())
      .pipe(rename({suffix: '.min'}))
    .pipe(concat('app.js'))
    .pipe(gutil.env.production ? gutil.noop() : sourcemaps.write())
    .pipe(gulp.dest('static/assets/js/dist'));
});

gulp.task('esdoc', function() {
  var esdoc = require('gulp-esdoc');

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
  gulp.watch(['static/assets/js/*.js'], ['build-js']);
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
    nodeArgs: ['--inspect=5858', '--nolazy']
  });
});
