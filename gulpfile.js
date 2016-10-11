var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function() {
    gulp.src('./frontend/scss/style.scss')
        .pipe(sass())
        .pipe(gulp.dest('./public/css'));
});