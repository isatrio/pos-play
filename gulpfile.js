/**
 * Start using it
 *
 * 1. Install nodejs, download it here https://nodejs.org/en/download/.
 * 2. To start go to folder project and then type npm install
 * 3. Install gulp and bower by type this command npm install gulp bower -g
 * 4. Install all dependencies using bower install
 * 5. Run task by type gulp
 *
 * Finish
 *
 */

// Include all plugins
var argv = require('minimist')(process.argv.slice(2));
var gulp = require('gulp');
var sass = require('gulp-sass');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var gulpif = require('gulp-if');
var sourcemaps = require('gulp-sourcemaps');

var baseUrl = 'assets/';
var destUrl = 'assets/';

// CLI options
var enabled = {
	// Enable static asset revisioning when `--production`
	rev: argv.production,
	// Disable source maps when `--production`
	maps: !argv.production,
	// Fail styles task on error when `--production`
	failStyleTask: argv.production,
	// Fail due to JSHint warnings only when `--production`
	failJSHint: argv.production,
	// Strip debug statments from javascript when `--production`
	stripJSDebug: argv.production
};

// jshint
gulp.task('jshint', function() {
	return gulp.src([baseUrl + 'js/app.js', 'gulpfile.js'])
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(gulpif(enabled.failJSHint, jshint.reporter('fail')));
});

// compile sass
gulp.task('sass', function() {
	return gulp.src([baseUrl + 'scss/*.scss'])
		.pipe(sourcemaps.init())
		.pipe(sass({outputStyle: 'compressed'}))
		.pipe(sourcemaps.write('/'))
		.pipe(gulp.dest(destUrl + 'css'));
});

// compile all js dev
gulp.task('js', function() {
	return gulp.src([baseUrl + 'js/app.js'])
		.pipe(concat('index.js'))
		.pipe(gulp.dest(destUrl + 'js'));
});


// compile plugins
gulp.task('plugins', function() {
	return gulp.src([
			'bower_components/jquery/dist/jquery.min.js',
			'bower_components/foundation/js/foundation.min.js',
			'bower_components/angular/angular.min.js',
			'bower_components/angular-touch/angular-touch.min.js',
			'bower_components/angular-sanitize/angular-sanitize.min.js',
			'bower_components/angular-route/angular-route.min.js',
			'bower_components/angular-resource/angular-resource.min.js',
			'bower_components/angular-cookies/angular-cookies.min.js',
			'bower_components/angular-animate/angular-animate.min.js',
            'bower_components/underscore/underscore-min.js'
		])
		.pipe(concat('plugins.js'))
		.pipe(uglify())
		.pipe(gulp.dest(destUrl + 'js'));
});

// Watch Files For Changes
gulp.task('watch', function() {
	gulp.watch(baseUrl + 'js/*js', ['jshint', 'js']);
	gulp.watch(baseUrl + 'scss/*.scss', ['sass']);
});

// Production 

gulp.task('prod', ['jshint', 'plugins', 'js', 'sass']);

// Default gulp task
gulp.task('default', ['jshint', 'js', 'sass']);
