'use strict';

var path = require('path');

var targetBase = './_public/frontend/';

module.exports = {
    target: {
        js: targetBase + '/js',
        lib: path.join(targetBase, 'js', 'lib'),
        css: path.join(targetBase, 'css'),
        index: targetBase,
        partials: path.join(targetBase, 'partials'),
        assets: targetBase
    },

    buildProfile: process.env.BUILD_PROFILE || 'dev',

    vendorFiles: {
        code: [
            './bower_components/console-polyfill/index.js',
            './bower_components/angular/angular.min.js',
            './bower_components/angular-i18n/angular-locale_fi-fi.js',
            './bower_components/angular-cookies/angular-cookies.min.js',
            './bower_components/angular-resource/angular-resource.min.js',
            './bower_components/angular-sanitize/angular-sanitize.min.js',
            './bower_components/angular-messages/angular-messages.min.js',
            './bower_components/angular-translate/angular-translate.min.js',
            './bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.min.js',
            './bower_components/angular-translate-storage-cookie/angular-translate-storage-cookie.min.js',
            './bower_components/angular-translate-handler-log/angular-translate-handler-log.min.js',
            './bower_components/angular-ui-router/release/angular-ui-router.min.js',
            './bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
            './bower_components/lodash/dist/lodash.min.js',
            './bower_components/ngstorage/ngStorage.min.js',
            './bower_components/ng-file-upload/ng-file-upload.min.js',
            "./vendor/**/*.js"
        ]
    },

    appFiles: {
        index: [
            "index.html"
        ],
        code: [
            "./app/**/*.js"
        ],
        styleBase: "./app/styles/",
        style: [
            "./app/styles/app.less"
        ],
        partials: [
            "./app/module/**/*.html"
        ],
        assetsBase: './app/assets/',
        assets: [
            './app/assets/**'
        ],
        shim: [
            './bower_components/angular-loader/angular-loader.min.js',
            './bower_components/script.js/dist/script.min.js',
            './bower_components/es5-shim/es5-shim.min.js',
            './bower_components/json3/lib/json3.min.js'
        ]
    }
};