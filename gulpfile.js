var gulp = require("gulp");
var gulpSass = require("gulp-sass");
var rename = require("gulp-rename");
var plumber = require("gulp-plumber")
var gulpBabel = require("gulp-babel");
var uglify = require('gulp-uglify');

var spritesmith = require('gulp.spritesmith'); //雪碧图

function err(error)
{
    console.error("[ERROR]".red+error.message);
    this.emit('end');
}

gulp.task("buildSass",function(){
    return gulp.src(['./src/**/*.scss'])
    .pipe(plumber(err))
    .pipe(gulpSass({
        outputStyle:"expanded"
    }).on("error",gulpSass.logError))
    .pipe(rename(function(path){
        path.extname = ".acss";
    }))
    .pipe(gulp.dest('./src'));
})

gulp.task("buildES6JS",function(){
    return gulp.src(['./src/**/*.js','!./src/**/*.min.js'])
    .pipe(plumber(err))
    .pipe(gulpBabel({
        presets:['env']
    }))
    .pipe(uglify({
        mangle: true,//类型：Boolean 默认：true 是否修改变量名
        compress: true,//类型：Boolean 默认：true 是否完全压缩
    }))
    .pipe(rename(function(path){
        path.extname=".min.js";
    }))
    .pipe(gulp.dest("./src"))
})

gulp.task("sprite",function(){
    return gulp.src(["./src/img/**/*.jpeg"])
    .pipe(plumber(err))
    .pipe(spritesmith({
        imgName:"sprite.jpeg",//合并后图片的名称
        cssName:"sprite.css" //生成的CSS文件
    }))
    .pipe(gulp.dest("./build"));
})

gulp.task("watch",["sprite"],function(){
    gulp.watch('./src/**/*.scss',['buildSass']);
    gulp.watch('./src/**/*.js',['buildES6JS']);
    gulp.watch('./img/**/*.jpeg',['sprite']);
})