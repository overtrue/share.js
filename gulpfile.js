var basePaths = {
  src: 'src/',
  dest: 'dist/',
  bower: 'bower_components/'
};
var paths = {
  scripts: {
    src: basePaths.src + 'js/',
    dest: basePaths.dest + 'js/'
  },
  styles: {
    src: basePaths.src + 'css/',
    dest: basePaths.dest + 'css/'
  },
  fonts: {
    src: basePaths.src + 'fonts/',
    dest: basePaths.dest + 'fonts/'
  }
};

var appFiles = {
  styles: [paths.styles.src + '**/*.scss'],
  jqueryShare: [paths.scripts.src + 'jquery.qrcode.min.js', paths.scripts.src + 'jquery.share.js'],
  socialShare: [paths.scripts.src + 'qrcode.js', paths.scripts.src + 'social-share.js'],
  fonts: [paths.fonts.src + '**/*']
};

var vendorFiles = {
  styles: [],
  scripts: [],
  fonts: []
};

/*
  Let the magic begin
*/

var gulp = require('gulp');

var es = require('event-stream');
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var del = require('del');

var plugins = require("gulp-load-plugins")({
  pattern: ['gulp-*', 'gulp.*'],
  replaceString: /\bgulp[\-.]/
});

// Allows gulp --dev to be run for a more verbose output
var isProduction = true;
var sassStyle = 'compressed';
var sourceMap = false;

if(gutil.env.dev === true) {
  sassStyle = 'expanded';
  sourceMap = true;
  isProduction = false;
}

var changeEvent = function(evt) {
  gutil.log('File', gutil.colors.cyan(evt.path.replace(new RegExp('/.*(?=/' + basePaths.src + ')/'), '')), 'was', gutil.colors.magenta(evt.type));
};

var clean = function(path, cb) {
  // You can use multiple globbing patterns as you would with `gulp.src`
  del([path], {force:true}, cb);
};

gulp.task('css', function(cb){
  // app css
  plugins.sass(vendorFiles.styles.concat(appFiles.styles), {
      outputStyle: sassStyle, sourcemap: sourceMap, precision: 2
    })
    // .pipe(plugins.concat('style.min.css'))
    .pipe(plugins.autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    // .pipe(isProduction ? plugins.cssmin() : gutil.noop())
    .pipe(plugins.size())
    .on('error', function(err){
      new gutil.PluginError('CSS', err, {showStack: true});
    })
    .pipe(plugins.notify())
    .pipe(plugins.rename({suffix: '.min'}))
    .pipe(gulp.dest(paths.styles.dest));
    cb()
});

gulp.task('jquery.share.js', function () {
  return gulp.src(appFiles.jqueryShare)
    .pipe(concat('jquery.share.js'))
    .pipe(isProduction ? plugins.uglify() : gutil.noop())
    .pipe(plugins.size())
    .pipe(plugins.notify())
    .pipe(plugins.rename({suffix: '.min'}))
    .pipe(gulp.dest(paths.scripts.dest));
});

gulp.task('share.js', function () {
  return gulp.src(appFiles.socialShare)
    .pipe(concat('social-share.js'))
    .pipe(isProduction ? plugins.uglify() : gutil.noop())
    .pipe(plugins.size())
    .pipe(plugins.notify())
    .pipe(plugins.rename({suffix: '.min'}))
    .pipe(gulp.dest(paths.scripts.dest));
});

gulp.task('fonts', function(){
  return gulp.src(appFiles.fonts)
    .pipe(gulp.dest(paths.fonts.dest));
});


gulp.task('watch', gulp.parallel('css', 'jquery.share.js', 'share.js', 'fonts'), function () {
  gulp.watch(appFiles.styles, ['css']).on('change', function (evt) {
    changeEvent(evt);
  });

  gulp.watch(paths.scripts.src + '*.js', ['jquery.share.js', 'share.js']).on('change', function (evt) {
    changeEvent(evt);
  });
});

gulp.task('default', gulp.parallel( 'css', 'jquery.share.js', 'share.js', 'fonts' ));
