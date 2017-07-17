var gulp = require('gulp');
var sass = require('gulp-sass');
var obfuscate = require('gulp-obfuscate');
var uglify = require('gulp-uglify');
var browserify = require('gulp-browserify');
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();


var rutas = {
    rutaJS: './src/assets/js/miGranJs.js',
    rutaSCSS: './src/assets/scss/main.scss',
    rutaHTML: 'src/*.html'
};

gulp.task('prepararJS', function () {
    gulp.src(rutas.rutaJS)
        .pipe(uglify())
        .pipe(obfuscate())
        .pipe(browserify())
        .pipe(rename('bundle.js'))
        .pipe(gulp.dest('./public/js'))
});

gulp.task('prepararCSS', function () {
    gulp.src(rutas.rutaSCSS)
        .pipe(sass({
                outputStyle: 'compressed',
                precision: 3
            })
            .on('error', sass.logError))
        .pipe(gulp.dest('./public/css'));
});
gulp.task('prepararHTML', function () {
    gulp.src(rutas.rutaHTML)
        .pipe(gulp.dest('./public'));

});

gulp.task('watchChangesCSS', function () {
    browserSync.init({ //se crea un nuevo servidor
        server: {
            baseDir: './public'
        }
    });
    gulp.watch(rutas.rutaSCSS, ['sass-watch'])
    gulp.watch(rutas.rutaJS, ['js-watch'])
    gulp.watch(rutas.rutaHTML, ['html-watch'])
});

gulp.task('sass-watch', ['prepararCSS'], function () {
    browserSync.reload();
});

gulp.task('js-watch', ['prepararJS'], function () {
    browserSync.reload();
});
gulp.task('html-watch', ['prepararHTML'], function () {
    browserSync.reload();
});
