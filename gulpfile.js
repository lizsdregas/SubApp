var gulp = require('gulp'),
    sass = require('gulp-sass'),
    webserver = require('gulp-webserver');

gulp.task('sass', function () {
    return gulp.src('app/css/styles.scss')
        .pipe(sass()).on('error', sass.logError)
        .pipe(gulp.dest('app/css'));
});

gulp.task('watch', function () {
    gulp.watch('app/css/*.scss', ['sass']);
});
 
gulp.task('server', function () {
    gulp.src('app')
      .pipe(webserver({
          livereload: true,
          open: true
      }));  
});

gulp.task('default', ['watch', 'server']);
