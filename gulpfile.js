const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');

const env = process.env.NODE_ENV | 'dev';
const buildLoc = 'dist';

// fetch command line arguments
const arg = (argList => {
    let arg = {}, a, opt, thisOpt, curOpt;
    for (a = 0; a < argList.length; a++) {
        thisOpt = argList[a].trim();
        opt = thisOpt.replace(/^\-+/, '');

        if (opt === thisOpt) {
            // argument value
            if (curOpt) arg[curOpt] = opt;
            curOpt = null;
        }
        else {
            // argument name
            curOpt = opt;
            arg[curOpt] = true;
        }
    }

    return arg;
})(process.argv);

gulp.task('sass', () => {
    gulp.src(['src/scss/*.scss'])
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(gulp.dest(`${buildLoc}/css/`));
});

gulp.task('img', () => {
    gulp.src(['src/img/*.jpg', 'src/img/**/*.jpg', 'src/img/*.png', 'src/img/**/*.png'])
        .pipe(gulp.dest(`${buildLoc}/img/`));
});

gulp.task('html', () => {
    gulp.src(['src/*.html', 'src/**/*.html'])
        .pipe(gulp.dest(`${buildLoc}/`));
});

gulp.task('reload', (done) => {
    browserSync.reload();
    done();
});

gulp.task('browsersync', () => {
    browserSync.init({
        server: {
            baseDir: './dist'
        }
    });

    gulp.watch(['src/scss/*.scss', 'src/scss/**/*scss'], ['sass', 'reload']);
    gulp.watch(['src/*.html', 'src/**/*.html'], ['html', 'reload']);
    gulp.watch(['src/img/*.jpg', 'src/img/*.png', 'src/img/**/*.jpg', 'src/img/**/*.png'], ['img', 'reload']);
});

gulp.task('build', ['html', 'img', 'sass']);
gulp.task('default', ['build', 'browsersync']);