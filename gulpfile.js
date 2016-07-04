'use strict';

let gulp = require('gulp');
let uglify = require('gulp-uglify');
let stream = require('gulp-streamify');
let util = require('gulp-util');
var sass = require('gulp-ruby-sass');
let sourcemaps = require('gulp-sourcemaps');
let source = require('vinyl-source-stream');
let buffer = require('vinyl-buffer');
let browserify = require('browserify');
let ngAnnotate = require('browserify-ngannotate');
let watchify = require('watchify');
let babel = require('babelify');
let fs = require('fs');
let browserSync = require('browser-sync').create();
let reload = browserSync.reload;

const config = {
  sass_dir: './src/scss',
  bower_dir: './src/libs',

  sourceDir: './app/',
  buildDir: './public/bin'
}


/** Browserify TASK **/
gulp.task( 'browserify', function () {

  let bundler = browserify({
    entries: [ config.sourceDir + 'app.js' ],
    debug: true
  });

util.log( '-> Compile JS...' );

  //Grab files
  return bundler
  .transform( 'babelify', { presets: [ "es2015" ] } )
  .bundle()
  .on('error', function ( err ) {
    util.log(err.message);
    this.emit("end");
  })
  .pipe( source( 'bundle.js' ) )
  .pipe( buffer() )
  .pipe( sourcemaps.init({ loadMaps: true }) )
    .pipe(uglify())
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
