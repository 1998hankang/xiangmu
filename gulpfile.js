const gulp = require('gulp');
const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');

gulp.task('sass',function(){
	gulp.src('src/scss/*.scss').pipe(sass()).pipe(rename({"suffix":".min"})).pipe(cssnano()).pipe(gulp.dest('css'));
})
//压缩js/重命名js/合并js
gulp.task('js',function(){
	gulp.src('src/js/*.js').pipe(uglify()).pipe(rename({"suffix":'.min'})).pipe(gulp.dest('js'));
})
//监听
gulp.task('watch',function(){
	gulp.watch(['src/js/*.js','src/scss/*.scss'],['js','sass']);
})
