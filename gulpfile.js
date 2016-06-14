var gulp = require('gulp');
var browserify = require('gulp-browserify');

gulp.task('scripts', function() {
    // Single entry point to browserify
    gulp.src('./frontend/app.js')
        .pipe(browserify({
            insertGlobals : true,
            debug : !gulp.env.production
        }))
        .pipe(gulp.dest('./public/js'))
});
