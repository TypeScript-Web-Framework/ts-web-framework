const gulp = require('gulp');
const ts = require('gulp-typescript');
const logging = require("gulp-remove-logging");
const fs = require("fs");
const tsProject = ts.createProject('tsconfig.json', {
    declaration : false,
    removeComments : true,
    declarationFiles :false
});
const minify = require('gulp-minify');
const clean = require('gulp-clean');
const manifiest = JSON.parse(fs.readFileSync('src/manifiest.json', 'utf8'));

gulp.task("compile", () => gulp.src( __dirname + "/src/**/*.ts").pipe(tsProject()).pipe(gulp.dest(__dirname + '/tmp')));
gulp.task('compress', () => {
    let chain = gulp.src(__dirname + '/tmp/**/*.js');
    if (manifiest.mode === "prod") {
        chain = chain
            .pipe(logging({namespace: ["window.console", "console", "process.stdout"]}))
            .pipe(minify({mangle: true, noSource: true, ext: {min: '.js'}}))
    }
    return chain.pipe(gulp.dest(__dirname + '/www'))
});
gulp.task("remove:tmp", () => gulp.src( [__dirname + '/tmp'], { read: false, allowEmpty:  true}).pipe(clean()));
gulp.task("remove:dist", () => gulp.src( __dirname + '/www', {read : false, allowEmpty: true}).pipe(clean()));
gulp.task("copy:json", () => gulp.src( __dirname + "/src/**/*.json").pipe(gulp.dest(__dirname + '/www')));
gulp.task("default", gulp.series(['remove:dist' , 'compile', 'compress' , 'copy:json', 'remove:tmp']));
