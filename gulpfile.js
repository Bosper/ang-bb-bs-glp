var gulp = require('gulp');
var uglify = require('gulp-uglify');
var stream = require('gulp-streamify');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var watchify = require('watchify');
var babel = require('babelify');
var fs = require('fs');

// gulp.task( 'build', function () {
//     return browserify({
//
//     })
// } );

/** Browserify TASK **/
gulp.task( 'browserify', function () {
  //Grab files
  return browserify( ['./app/app.js'] )
  .transform( 'babelify', { presets: [ "es2015" ] } )
  .bundle()
  .pipe( source( 'bundle.js' ) )
  .pipe( buffer(uglify()) )
  //Dest
  .pipe( gulp.dest( 'public/bin/' ) )
} );

// function compile( watch ) {
//     var bundler = watchify( browserify( './app/app.js' ), { debug: true } ).transform( babel );
//
//     function rebundle() {
//         bundler.bundle()
//             .on( 'error', function ( err ) {
//                 console.log( err );
//                 this.emit( 'end' );
//             } )
//             .pipe( source( 'bundle.js' ) )
//             .pipe( buffer() )
//             .pipe( sourcemaps.init({ loadMaps: true }) )
//             .pipe( sourcemaps.write( './public/bin' ) )
//             .pipe( dest( './public/bin' ) );
//     }
//
//     if ( watch ) {
//         bundler.on( 'update', function () {
//             console.log( '-> bundling...' );
//             rebundle();
//         } );
//     }
//
//     rebundle();
// }
//
// gulp.task( 'compile', function compile() {
//     return compile();
// } );
