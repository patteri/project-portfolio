'use strict';

var path = require('path');

var targetBase = './_public/frontend/';

module.exports = {
    target: {
        js: targetBase + '/js',
        lib: path.join(targetBase, 'js', 'lib'),
        css: path.join(targetBase, 'css'),
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
            './bower_components/angular-ui-router/release/angular-ui-router.min.js',
            './bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
            "./vendor/**/*.js"
        ]
    },

    appFiles: {
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