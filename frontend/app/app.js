'use strict';

var App = angular.module('app', [
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngMessages',
        'pascalprecht.translate',
        'ui.bootstrap',
        'ui.router',

        // Pre-cached partials
        'app.partials',

        // Common
        'common.services.contentService',

        // Controllers
        'app.frontpage.controller', 'app.files.controller', 'app.projects.controller', 'app.contact.controller'
    ])
    .run(['$state', function ($state) {
        $state.go('main.frontpage');
    }])
    .config(['$urlRouterProvider', '$locationProvider', function ($urlRouterProvider, $locationProvider) {
        $urlRouterProvider.otherwise('/');

        // Without server side support html5 must be disabled.
        $locationProvider.html5Mode(false);
    }])
    .config(['$translateProvider', function ($translateProvider) {
        // Initialize angular-translate
        $translateProvider.useStaticFilesLoader({
            prefix: '_public/frontend/i18n/',
            suffix: '.json'
        });

        $translateProvider.preferredLanguage('en');
        $translateProvider.useCookieStorage();
        $translateProvider.useMissingTranslationHandlerLog();
    }])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('main', {
            abstract: true,
            url: '',
            templateUrl: '_public/frontend/partials/main.html'
        });
    }]);