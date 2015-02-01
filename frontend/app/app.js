'use strict';

var App = angular.module('app', [
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngMessages',
        'ui.bootstrap',
        'ui.router',

        // Pre-cached partials
        'app.partials',

        // Controllers
        'app.frontpage.controller', 'app.projects.controller'
    ])
    .run(['$state', function ($state) {
        $state.go('main.frontpage');
    }])
    .config(['$urlRouterProvider', '$locationProvider', function ($urlRouterProvider, $locationProvider) {
        $urlRouterProvider.otherwise('/');

        // Without server side support html5 must be disabled.
        $locationProvider.html5Mode(false);
    }])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('main', {
            abstract: true,
            url: '',
            templateUrl: '_public/frontend/partials/main.html'
        });
    }]);