import gulp from 'gulp';
import sass from 'sass';
import gulpSass from 'gulp-sass';
import del from 'gulp-clean';

const src = gulp.src;
const dest = gulp.dest;
const watch = gulp.watch;
const series = gulp.series;

// styles
const scss = gulpSass(sass);
const stylesPath = './styles';

function compileScssFile() {
  return src(`${stylesPath}/*.scss`)
    .pipe(scss())
    .pipe(dest(stylesPath));
}

function clearStyles() {
  return src(`${stylesPath}/*.css`)
    .pipe(del());
}

function stylesWatcher() {
  watch(`${stylesPath}/*.scss`, series(clearStyles, compileScssFile));
}

export default series(clearStyles, compileScssFile, stylesWatcher);
export const clear = clearStyles;
