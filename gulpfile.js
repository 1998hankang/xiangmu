const gulp = require('gulp');
const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');

gulp.task('sass',function(){
	gulp.src('sass/*.scss').pipe(sass()).pipe(rename({"suffix":".min"})).pipe(cssnano()).pipe(gulp.dest('css'));
})

gulp.task('js',function(){
	gulp.src('src/js/*.js').pipe(uglify()).pipe(rename({"suffix":'.min'})).pipe(concat("all.js")).pipe(gulp.dest('js'));
})

gulp.task('watch',function(){
	gulp.watch(['src/js/*.js','src/scss/*.scss'],['js','sass']);
})

