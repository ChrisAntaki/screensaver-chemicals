var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var watchify = require('watchify');

var bundler = watchify(browserify('./src/js/index.js', watchify.args));

gulp.task('js', bundle); // Add task: 'gulp js'
bundler.on('update', bundle); // Bundle when dependencies are updated

function onError(e) {
    console.log(e.toString());
}

function bundle() {
    console.log('Bundling...');

    return bundler.bundle()
    .on('error', onError) // Log errors

    .pipe(source('index.js'))

    .pipe(gulp.dest('./public/js'));
}
