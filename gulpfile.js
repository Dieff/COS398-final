const gulp = require('gulp');

// Building SCSS
const sass = require('gulp-sass')(require('sass'));

function buildSCSS() {
  return gulp.src('src/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('public/'));
}


// Building Typescript
const ts = require('gulp-typescript');

function buildTS() {
  const tsProject = ts.createProject("tsconfig.json");
  return gulp.src("src/**/*.ts")
    .pipe(tsProject())
    .pipe(gulp.dest('public/'));
};


// Building HTML templates
const pug = require('gulp-pug');

function buildPug() {
  return gulp.src("src/*.pug")
    .pipe(
      pug({
        pretty: true,
      })
    )
    .pipe(gulp.dest('public/'));
}


// Build YAML data for quizzed and wayland picker
const yaml = require('gulp-yaml');

function buildYaml() {
  return gulp.src('./src/**/*.yaml')
    .pipe(yaml({ safe: true }))
    .pipe(gulp.dest('./public/'))
}


// Placing static resources
function moveStatics() {
  return gulp.src("static/*").pipe(gulp.dest("public/"));
}

exports.default = gulp.parallel(buildTS, buildSCSS, buildPug, buildYaml, moveStatics);
