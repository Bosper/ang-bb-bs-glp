'use strict';

let gulp = require('gulp');
let uglify = require('gulp-uglify');
let stream = require('gulp-streamify');
let util = require('gulp-util');
let sass = require('gulp-ruby-sass');
let sourcemaps = require('gulp-sourcemaps');
let clean = require('gulp-clean');
let connect = require('gulp-connect');
let source = require('vinyl-source-stream');
let buffer = require('vinyl-buffer');
let browserify = require('browserify');
let ngAnnotate = require('browserify-ngannotate');
let watchify = require('watchify');
let babelify = require('babelify');
let fs = require('fs');
let stringify = require('stringify');
let sequence = require('run-sequence');

let browserSync = require('browser-sync').create();
let reload = browserSync.reload;

const config = {
  sass_dir: './src/scss',
  bower_dir: './src/libs',

  sourceDir: './app/',
  buildDir: './public/bin'
}

/** Connect TASK **/
gulp.task( 'connect', function () {
  connect.server({
    root: 'public',
    port: 3000
  } )
} );

/** Browserify TASK **/
gulp.task( 'browserify', function () {

  let bundler = browserify({
    entries: [ config.sourceDir + 'app.js' ],
    debug: true
  });

util.log( '-> Compile JS...' );

  //Grab files
  return bundler
  .transform( babelify, { presets: [ "es2015" ] } )
  .transform( 'html2js-browserify' )
  .bundle()
  .on('error', function (err) {
      console.error(err);
      this.emit('end');
    })
  .pipe( source( 'bundle.js' ) )
  .pipe( buffer() )
  .pipe( sourcemaps.init({ loadMaps: true }) )
    .pipe(uglify({
      mangle: false
    }))
  .pipe( sourcemaps.write( './' ) )
  //Dest
  .pipe( gulp.dest( config.buildDir ) )
} );

/** Sass TASK **/
gulp.task('sass', () =>
    sass( config.sass_dir + '/master.scss', {
      style: 'expanded',
      loadPath: [
        config.bower_dir + '/font-awesome/scss'
      ]
    } )
        .on('error', sass.logError)
        .pipe(gulp.dest('./public/css'))
        .pipe(reload({stream:true}))
);

/** Icon TASK **/
gulp.task( 'icons', function () {
    return gulp.src( [ config.bower_dir + '/font-awesome/fonts/**.*' ] )
      .pipe( gulp.dest( './public/fonts' ) );
} );

/** Sync TASK **/
gulp.task( 'browser-sync', function () {
  browserSync.init(
    [
      'public/css/*.css',
      'public/bin/*.js'
    ],
    {
      proxy: 'localhost:3000'
  } );
} );

/** Reload task **/
gulp.task('bs-reload', function () {
    browserSync.reload();
});

/** Clean TASK **/
gulp.task( 'clean', function () {
  return gulp.src( ['./public/bin/*.js', './public/bin/*.js.map', './public/css/*.css'] )
  .pipe(clean())
} );

/** Watch TASK **/
gulp.task( 'watch', [ 'sass', 'browser-sync', 'connect' ], function () {
  gulp.watch( [ './src/scss/*.scss', './src/scss/**/*.scss' ], [ 'sass' ] )
  gulp.watch( [ './app/*.js', './app/**/*.js' ], [ 'browserify' ] )
  gulp.watch( [ './public/*.html' ], [ 'bs-reload' ] );
} );

/** Build TASK **/
gulp.task( 'build', function ( callback ) {
  sequence( 'clean', 'sass', 'icons', 'browserify' )
} );

/** Default TASK **/
gulp.task( 'default', function ( callback ) {
  sequence( [ 'build', 'watch' ] )
} );
