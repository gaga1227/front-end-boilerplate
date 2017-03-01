// vars
var paths = {
	src: 'app/src',
	dist: 'app/dist'
};

// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var sass = require('gulp-sass');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var clean = require('gulp-clean');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

// Compile Sass & auto-inject into browsers
gulp.task('sass', function () {
	return gulp.src(paths.src + '/lib/scss/**/*.scss')
		.pipe(sass({
			outputStyle: 'compressed'
		}))
		.pipe(gulp.dest(paths.src + '/lib/css'))
		.pipe(reload({
			stream: true
		}));
});

// Lint Task
gulp.task('lint', function () {
	return gulp.src(paths.src + '/lib/js/app/**/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

// Concatenate, Minify JS & auto-inject into browsers
gulp.task('appscripts', function () {
	return gulp.src(paths.src + '/lib/js/app/**/*.js')
		.pipe(concat('app.js'))
		.pipe(gulp.dest(paths.src + '/lib/js'))
		.pipe(rename('app.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest(paths.src + '/lib/js'))
		.pipe(reload({
			stream: true
		}));
});

gulp.task('vendorscripts', function () {
	return gulp.src(paths.src + '/lib/js/vendor/**/*.js')
		.pipe(concat('vendor.js'))
		.pipe(gulp.dest(paths.src + '/lib/js'))
		.pipe(rename('vendor.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest(paths.src + '/lib/js'))
		.pipe(reload({
			stream: true
		}));
});

// Watch Files For Changes
gulp.task('watch', function () {
	gulp.watch(paths.src + '/lib/js/app/**/*.js', ['lint', 'appscripts']);
	gulp.watch(paths.src + '/lib/scss/**/*.scss', ['sass']);
});

// Static Server + watching scss/html files
gulp.task('serve', ['sass', 'appscripts'], function () {
	browserSync({
		server: './' + paths.src + '/'
	});
	gulp.watch(paths.src + '/lib/js/app/**/*.js', ['appscripts']);
	gulp.watch(paths.src + '/lib/scss/**/*.scss', ['sass']);
	gulp.watch(paths.src + '/**/*.html').on('change', reload);
});

// clean dist folder
gulp.task('clean', function () {
	return gulp.src(paths.dist + '/**/*', {
			read: false,
			force: true
		})
		.pipe(clean());
});

// deploy app artifact
gulp.task('dist', ['clean'], function () {
	gulp.src(paths.src + '/**/*.html').pipe(gulp.dest(paths.dist));
	gulp.src(paths.src + '/apple-touch-icon-precomposed.png').pipe(gulp.dest(paths.dist));
	gulp.src(paths.src + '/favicon.png').pipe(gulp.dest(paths.dist));
	gulp.src(paths.src + '/lib/css/**/*.css').pipe(gulp.dest(paths.dist + '/lib/css'));
	gulp.src(paths.src + '/lib/js/*.min.js').pipe(gulp.dest(paths.dist + '/lib/js'));
	gulp.src(paths.src + '/lib/font/**/*').pipe(gulp.dest(paths.dist + '/lib/font'));
	gulp.src(paths.src + '/lib/icon/**/*').pipe(gulp.dest(paths.dist + '/lib/icon'));
	gulp.src([paths.src + '/lib/img/**/*', '!**/*.psd', '!**/*.ai']).pipe(gulp.dest(paths.dist + '/lib/img'));
});

// Develop with existing server, not using browser sync
gulp.task('dev', ['sass', 'lint', 'appscripts', 'watch']);

// Build Tasks
gulp.task('build', ['sass', 'lint', 'appscripts', 'vendorscripts']);

// Default Task
gulp.task('default', ['serve']);
