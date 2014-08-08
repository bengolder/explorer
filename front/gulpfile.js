var gulp        =  require('gulp'),
    gutil       =  require('gulp-util'),
    concat      =  require('gulp-concat'),
    less        =  require('gulp-less'),
    jshint      = require('gulp-jshint'),
    stylish     = require('jshint-stylish'),
    cssmin      =  require('gulp-minify-css'),
    htmlmin     =  require('gulp-minify-html'),
    uglify      =  require('gulp-uglify'),
    streamify   =  require('gulp-streamify'),
    browserify  =  require('browserify'),
    hbsfy       =  require('hbsfy').configure({ extensions: ["html", "hbs"] }),
    source      =  require('vinyl-source-stream'),
    rename      =  require('gulp-rename');

var appdir =  './app/';
var distdir = './dist/';
var appstatic = appdir + 'static/';

var lessfiles = [
		appdir + 'less/main.less',
	];

var jsfiles = [
		'./gulpfile.js',
		'./app/js/**/*.js',
	];

var templates = [
	'./app/js/templates/**/*',
];

var vendorfiles = [
		'./node_modules/modernizr/modernizr.js',
		'./node_modules/jquery/dist/jquery.js',
		'./node_modules/bootstrap/dist/js/bootstrap.js',
		'./node_modules/dat-gui/build/dat.gui.js',
	];

var staticfiles = [
		appstatic + 'data/*.js',
		appstatic + 'fonts/*',
		appstatic + 'favicon.ico',
	];

gulp.task('lint', function() {
  return gulp.src(jsfiles)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

// Concatenate & Minify JS
gulp.task('js', ['lint'], function() {
	return browserify('./app/js/main.js')
		.transform(hbsfy)
		.bundle({ debug: true })
		.pipe(source('bundle.js'))
		.pipe(gulp.dest(appstatic + 'js'))
		.pipe(streamify(uglify()))
		.pipe(gulp.dest(distdir + 'js'));
});

gulp.task('vendor', function(){
	return gulp.src(vendorfiles)
		.pipe(concat('vendor.js'))
		.pipe(gulp.dest(appstatic + 'js'))
		.pipe(uglify())
		.pipe(gulp.dest(distdir + 'js'));
});

gulp.task('html', function(){
	return gulp.src(['./app/index.html'])
		.pipe(gulp.dest(distdir));
});

gulp.task('copy', function(){
	return gulp.src(staticfiles, { base: appstatic })
		.pipe(gulp.dest(distdir));
});

gulp.task('less', function(){
	return gulp.src(lessfiles)
		.pipe(less())
		.on('error', gutil.log)
		.pipe(gulp.dest(appstatic + 'css'))
		.pipe(cssmin())
		.pipe(gulp.dest(distdir + 'css'));

});

gulp.task('watch', function() {
    gulp.watch( jsfiles.concat(templates), ['js']);
    gulp.watch( lessfiles, ['less']);
});

gulp.task('build', ['less', 'html', 'vendor', 'copy', 'js']);
gulp.task('default', ['less', 'html', 'vendor', 'copy', 'js', 'watch']);
