var gulp = require('gulp');
var minifycss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var obfuscate = require('gulp-obfuscate');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');

gulp.task('js', function () {
    'use strict';
    let jsDst = './build ';


    gulp.src([
        './src/js/override/*.js'
    ])
        .pipe(concat('codemao-fabric-override.js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest(jsDst));

    gulp.src([
        './src/js/*.js'
    ])
        .pipe(concat('codemao-fabric.js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(obfuscate({exclude: ['fabric']}))
        .pipe(uglify())
        .pipe(gulp.dest(jsDst));
});

gulp.task('js-debug', function () {
    'use strict';
    let jsDst = './dist/js';

    gulp.src([
        './src/js/override/*.js'
    ])
        .pipe(concat('codemao-fabric-override.js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(jsDst));

    gulp.src([
        './src/js/*.js'
    ])
        .pipe(concat('codemao-fabric.js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(jsDst));
});

gulp.task('css', function () {
    'use strict';
    let cssSrc = './src/css/*.css',
        cssDst = './dist/css',
        processors = [
            autoprefixer
        ];


    gulp.src(cssSrc)
        .pipe(postcss(processors))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(cssDst));
});
gulp.task('css-debug', function () {
    'use strict';
    let cssSrc = './src/css/*.css',
        cssDst = './dist/css',
        processors = [
            autoprefixer
        ];

    gulp.src(cssSrc)
        .pipe(postcss(processors))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(cssDst));
});

gulp.task('default', function () {
    gulp.run('js');
    gulp.run('css');

    gulp.watch('./src/js/*.js', function () {
        gulp.run('js');
    });
    gulp.watch('./src/css/*.css', function () {
        gulp.run('css');
    });
});

gulp.task('debug', function () {
    gulp.run('js-debug');
    gulp.run('css-debug');

    gulp.watch('./src/js/*', function () {
        gulp.run('js-debug');
    });
    gulp.watch('./src/css/*.css', function () {
        gulp.run('css-debug');
    });
});
