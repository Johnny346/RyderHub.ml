'use strict'

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cssmin = require('gulp-cssmin')
var rename = require('gulp-rename');
var runSequence = require('run-sequence');


gulp.paths = {
  dist: 'dist/',
  src: 'src/',
  vendors: 'dist/vendors/'
};

var paths = gulp.paths;

require('require-dir')('./gulp-tasks');
//-------------------------------------------
gulp.task('default', ['browser-sync'], function () {
});

gulp.task('browser-sync', ['nodemon'], function() {
	browserSync.init(null, {
		proxy: "http://localhost:3000",
        files: ["src/**/*.*"],
        browser: "google chrome",
        port: 7000,
	});
});
gulp.task('nodemon', function (cb) {
	
	var started = false;
	
	return nodemon({
		script: 'app.js'
	}).on('start', function () {
		// to avoid nodemon being started multiple times
		// thanks @matthisk
		if (!started) {
			cb();
			started = true; 
		} 
	});
});
//----------------------------------------------


// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

  browserSync.init(null, {
		proxy: "http://localhost:3000",
        files: ["src/**/*.*"],
        browser: "google chrome",
        port: 7000,
	});

  gulp.watch(paths.src + 'scss/**/*.scss', ['sass']);
  gulp.watch(paths.src + '**/*.html').on('change', browserSync.reload);
  gulp.watch(paths.src + 'js/**/*.js').on('change', browserSync.reload);

});


// Static Server without watching scss files
gulp.task('serve:lite', function() {

  browserSync.init({
    server: ['./', './src']
  });

  gulp.watch(paths.src + '**/*.css').on('change', browserSync.reload);
  gulp.watch(paths.src + '**/*.html').on('change', browserSync.reload);
  gulp.watch(paths.src + 'js/**/*.js').on('change', browserSync.reload);

});

// gulp.task('serve:dist', function() {
//   browserSync.init({
//     server: ['./dist']
//   });
// });

gulp.task('sass', ['compile-vendors'], function() {
  return gulp.src(paths.src + '/scss/style.scss')
  .pipe(sass())
  .pipe(autoprefixer())
  .pipe(gulp.dest(paths.src + 'css'))
  .pipe(cssmin())
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest(paths.src + 'css'))
  .pipe(browserSync.stream());
});

gulp.task('sass:watch', function() {
  gulp.watch(paths.src + 'scss/**/*.scss', ['sass']);
});

gulp.task('default', ['serve']);
