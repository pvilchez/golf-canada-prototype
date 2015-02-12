var gulp = require('gulp');                   // Gulp!

var sass = require('gulp-sass');              // Sass
var bourbon = require('node-bourbon');
var prefix = require('gulp-autoprefixer');    // Autoprefixr
var minifycss = require('gulp-minify-css');   // Minify CSS
var concat = require('gulp-concat');          // Concat files
var uglify = require('gulp-uglify');          // Uglify javascript
var svgmin = require('gulp-svgmin');          // SVG minify
var imagemin = require('gulp-imagemin');      // Image minify
var rename = require('gulp-rename');          // Rename files
var livereload = require('gulp-livereload');  // LiveReload
var jshint = require("gulp-jshint");          // jshint
var react = require("gulp-react");            // react




//
//    Compile all CSS for the site
//
//////////////////////////////////////////////////////////////////////


  gulp.task('sass', function (){
    gulp.src([
      'bower_components/foundation/scss/normalize.scss',        // Gets normalize
      'assets/scss/app.scss'])                                  // Gets the apps scss
      .pipe(sass({
        includePaths: bourbon.includePaths,
        style: 'compressed',
        errLogToConsole: true}))  // Compile sass
      .pipe(concat('main.css'))                                 // Concat all css
      .pipe(rename({suffix: '.min'}))                           // Rename it
      //.pipe(minifycss())                                        // Minify the CSS
      .pipe(gulp.dest('assets/css/'))                           // Set the destination to assets/css
      .pipe(livereload({auto: false}));                         // Reloads server
  });


gulp.task('react', function () {
  return gulp.src('assets/js/components/*.jsx')
    .pipe(react({harmony: true}))
    .pipe(rename({prefix: '_'}))                                // Rename it
    .pipe(gulp.dest('assets/js/components/'));
});


//
//    Get all the JS, concat and uglify
//
//////////////////////////////////////////////////////////////////////


  gulp.task('javascripts', function(){
    gulp.src([
      'bower_components/fastclick/lib/fastclick.js',      // Gets fastclick

      // Gets Foundation JS change to only include the scripts you'll need
      'bower_components/foundation/js/foundation/foundation.js',
      'bower_components/foundation/js/foundation/foundation.abide.js',
      'bower_components/foundation/js/foundation/foundation.accordion.js',
      'bower_components/foundation/js/foundation/foundation.alert.js',
      'bower_components/foundation/js/foundation/foundation.clearing.js',
      'bower_components/foundation/js/foundation/foundation.dropdown.js',
      'bower_components/foundation/js/foundation/foundation.equalizer.js',
      'bower_components/foundation/js/foundation/foundation.interchange.js',
      'bower_components/foundation/js/foundation/foundation.joyride.js',
      'bower_components/foundation/js/foundation/foundation.magellan.js',
      'bower_components/foundation/js/foundation/foundation.offcanvas.js',
      'bower_components/foundation/js/foundation/foundation.orbit.js',
      'bower_components/foundation/js/foundation/foundation.reveal.js',
      'bower_components/foundation/js/foundation/foundation.slider.js',
      'bower_components/foundation/js/foundation/foundation.tab.js',
      'bower_components/foundation/js/foundation/foundation.tooltip.js',
      'bower_components/foundation/js/foundation/foundation.topbar.js',

      'bower_components/snap.svg/dist/snap.svg-min.js',
      'bower_components/sticky-kit/jquery.sticky-kit.min.js',
      'bower_components/react/react-with-addons.min.js',
      'bower_components/react/JSXTransformer.js',
      'bower_components/isotope-masonry-horizontal/masonry-horizontal.js',
      // moving on...
      'assets/js/plugins/*.js',             // Gets all the user plugins
      'assets/js/_*.js',
      'assets/js/components/_*.js'])        // Gets all the user JS _*.js from assets/js
      .pipe(concat('scripts.js'))           // Concat all the scripts
      .pipe(rename({suffix: '.min'}))       // Rename it
      .pipe(uglify())                       // Uglify(minify)
      .pipe(gulp.dest('assets/js/'))        // Set destination to assets/js
      .pipe(livereload({auto: false}));     // Reloads server
  });





//
//    Copy bower components to assets-folder
//
//////////////////////////////////////////////////////////////////////


  gulp.task('copy', ['copy-modernizr', 'copy-jquery']);

  gulp.task('copy-modernizr', function(){
    return gulp.src('bower_components/modernizr/modernizr.js')      // Gets Modernizr
    .pipe(uglify())                                                 // Uglify(minify)
    .pipe(rename({suffix: '.min'}))                                 // Rename it
    .pipe(gulp.dest('assets/js/'));                                 // Set destination to assets/js
  });

  gulp.task('copy-jquery', function(){
    return gulp.src('bower_components/jquery/dist/jquery.min.js')   // Gets Jquery
    .pipe(gulp.dest('assets/js/'));                                 // Set destination to assets/js
  });









//
//    JS hint
//
//////////////////////////////////////////////////////////////////////



  gulp.task('jshint', function() {
    return gulp.src('assets/js/_*.js')
      .pipe(jshint())});



//
//    Minify all SVGs and images
//
//////////////////////////////////////////////////////////////////////


  gulp.task('svgmin', function() {
    gulp.src('assets/img/*.svg')                      // Gets all SVGs
    .pipe(svgmin())                                   // Minifies SVG
    .pipe(gulp.dest('assets/img_min/'));              // Set destination to assets/img_min/
  });

  gulp.task('imagemin', function () {
    gulp.src(['assets/img/*', '!assets/img/*.svg'])   // Gets all images except SVGs
    .pipe(imagemin())                                 // Minifies
    .pipe(gulp.dest('assets/img_min/'));              // Set destination to assets/img_min/
  });














//
//    Default gulp task.
//
//////////////////////////////////////////////////////////////////////


gulp.task('watch', function(){

  var server = livereload();
  gulp.watch('**/*.php').on('change', function(file) {
    var parts = file.path.split('/');
    var name = parts[parts.length - 1];

    server.changed(file.path);
    gulp.src(file.path);
  });


  gulp.watch("bower_components/foundation/scss/**/*.scss", ['sass']);             // Runs sass on foundation components change
  gulp.watch("bower_components/foundation/scss/**/*.sass", ['sass']);
  gulp.watch("assets/scss/**/*.scss", ['sass']);                                  // Watch and run sass on changes
  gulp.watch("assets/scss/**/*.sass", ['sass']);
  gulp.watch("assets/js/_*.js", ['jshint', 'javascripts']);                       // Watch and run javascripts on changes
  gulp.watch("assets/img/*", ['imagemin', 'svgmin']);                             // Watch and minify images on changes
  gulp.watch("assets/js/components/*.jsx", ['react', 'jshint', 'javascripts']);   // Watch JSX templates for changes

});

gulp.task('default', ['sass', 'react', 'jshint', 'javascripts', 'copy', 'watch']);
gulp.task('build', ['sass', 'react', 'jshint', 'javascripts', 'copy']);

