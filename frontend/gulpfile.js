var gulp = require("gulp");
var plugins = require('gulp-load-plugins')();
var config = require('./build.config.js');

console.log("BUILD PROFILE", config.buildProfile);

gulp.task('jshint', function () {
    return gulp.src(config.appFiles.code)
        .pipe(plugins.changed(config.target.js))
        .pipe(plugins.jshint('.jshintrc'))
        .pipe(plugins.jshint.reporter('jshint-stylish'));
});

gulp.task('appCode', function () {
    var isProduction = (config.buildProfile === 'prod');

    return gulp.src(config.appFiles.code)
        .pipe(plugins.if(!isProduction, plugins.sourcemaps.init()))
        .pipe(plugins.concat('app.min.js'))
        .pipe(plugins.uglify({
            mangle: false
        }))
        .pipe(plugins.if(!isProduction, plugins.sourcemaps.write()))
        .pipe(gulp.dest(config.target.js))
        .pipe(plugins.size({title: 'application'}));
});

gulp.task('appPartials', function () {
    return gulp.src(config.appFiles.partials)
        .pipe(plugins.changed(config.target.js))
        .pipe(plugins.minifyHtml({
            empty: true,
            spare: true,
            quotes: true
        }))
        .pipe(gulp.dest(config.target.partials))
        .pipe(plugins.ngHtml2js({
            moduleName: 'app.partials',
            prefix: 'frontend/partials/',
            declareModule: false
        }))
        .pipe(plugins.concat('partials.js'))
        .pipe(plugins.insert.prepend("angular.module('app.partials',[]);"))
        .pipe(plugins.uglify({
            mangle: false
        }))
        .pipe(gulp.dest(config.target.js))
        .pipe(plugins.size({title: 'templates'}));
});

gulp.task('appLess', function () {
    return gulp.src(config.appFiles.style)
        .pipe(plugins.less({
            paths: [config.appFiles.styleBase]
        }))
        .pipe(plugins.concat('app.css'))
        .pipe(plugins.minifyCss())
        .pipe(gulp.dest(config.target.css))
        .pipe(plugins.size({ title: 'css' }));
});

gulp.task('appAssets', function () {
    return gulp.src(config.appFiles.assets, {base: config.appFiles.assetsBase})
        .pipe(gulp.dest(config.target.assets));
});

gulp.task('appShim', function () {
    return gulp.src(config.appFiles.shim)
        .pipe(plugins.uglify({
            mangle: false,
            compress: false,
            preserveComments: 'some'
        }))
        .pipe(gulp.dest(config.target.lib));
});

gulp.task('vendorCode', function () {
    return gulp.src(config.vendorFiles.code)
        .pipe(plugins.concat('vendor.min.js'))
        // Skip compression on minified files
        .pipe(plugins.if('*.min.js', plugins.uglify({
            mangle: false,
            compress: false,
            preserveComments: 'some'
        })))
        .pipe(plugins.if('vendor/**/*.js', plugins.uglify({
            mangle: false,
            compress: true
        })))
        .pipe(gulp.dest(config.target.js))
        .pipe(plugins.size({title: 'vendor'}));
});

gulp.task('watch', ['jshint', 'build'], function () {
    gulp.watch(config.appFiles.partials, ['appPartials']);
    gulp.watch(config.appFiles.code, ['appCode', 'jshint']);
    gulp.watch(config.appFiles.styleBase + '**', ['appLess']);
    gulp.watch(config.appFiles.assets, ['appAssets']);
    gulp.watch(config.vendorFiles.code, ['vendorCode']);
});

gulp.task('build', [
    'appLess',
    'appShim',
    'appAssets',
    'appPartials',
    'appCode',
    'vendorCode'
]);

gulp.task('default', ['watch']);