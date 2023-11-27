const gulp = require('gulp');

const sass = require('gulp-sass')(require('sass'));

function buildSCSS() {
  return gulp.src('src/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('public/'));
}


const ts = require('gulp-typescript');

function buildTS() {
  const tsProject = ts.createProject("tsconfig.json");
  return gulp.src("src/**/*.ts")
    .pipe(tsProject())
    .pipe(gulp.dest('public/'));
};


const pug = require('gulp-pug');

function buildPug() {
  return gulp.src('src/*.pug')
    .pipe(
      pug({
        // Your options in here.
      })
    )
    .pipe(gulp.dest('public/'));
}

exports.default = gulp.parallel(buildTS, buildSCSS, buildPug);
