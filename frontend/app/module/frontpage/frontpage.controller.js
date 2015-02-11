'use strict';

angular.module('app.frontpage.controller', [])
    .config(['$stateProvider',
        function ($stateProvider) {
            $stateProvider
                .state('main.frontpage', {
                    url: '/about',
                    templateUrl: 'partials/frontpage/frontpage.html'
                });
        }]);