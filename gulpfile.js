'use strict';

var gulp = require('gulp'),
  concat = require('gulp-concat'),
  browserSync = require('browser-sync'),
  sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps'),
  jade = require('gulp-jade'),
  plumber = require('gulp-plumber');


/* --------- paths --------- */
var paths = {
  scss: {
    location: ['dev/scss/*.scss'],
    destination: 'dev/css'
  },

  js: {
    location: ['dev/js/modules/*.js'],
    destination: 'dev/js'
  },

  bowerCss: {
    location: [
      'bower_components/normalize-css/normalize.css'
    ],
    destination: 'dev/css'
  },

  bowerJS: {
    location: [
      'bower_components/jquery/dist/jquery.js'
    ],
    destination: 'dev/js'
  }
};


/* ----- jade ----- */
gulp.task('jade', function () {
  gulp.src(['dev/jade/[^_]*.jade'])
    .pipe(plumber())
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('dev/'))
});


/* ------ sass ------ */
gulp.task('sass', function () {
  gulp.src(paths.scss.location)
    .pipe(plumber())
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.scss.destination));
});



/* -------- concat js -------- */
gulp.task('concat-js', function () {
  return gulp.src(paths.js.location)
    .pipe(concat('app.js'))
    .pipe(gulp.dest(paths.js.destination));
});


/* -------- gulp server  -------- */
gulp.task('server', function () {
  browserSync({
    port: 9000,
    server: {
      baseDir: 'dev'
    }
  });
});


/* -------- gulp watching  -------- */
gulp.task('watch', function () {
  gulp.watch('dev/jade/*.jade', ['jade']);
  gulp.watch('dev/scss/*.scss', ['sass']);
  gulp.watch('dev/js/modules/*.js', ['concat-js']);
  gulp.watch([
    'dev/index.html',
    'dev/js/**/*.js',
    'dev/css/**/*.css'
  ]).on('change', browserSync.reload);
});


gulp.task('default', [
  'jade',
  'sass',
  'concat-js',
  'watch',
  'server'
]);




