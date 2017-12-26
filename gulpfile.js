const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');

gulp.task('scss', function () {
  return gulp.src('./scss/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('app.css'))
    .pipe(gulp.dest('./public/css'))
  ;
});

gulp.task('watch:scss', () => {
  gulp.watch('scss/**/*', ['scss']);
});

gulp.task('default', ['scss']);
gulp.task('watch', ['scss', 'watch:scss']);