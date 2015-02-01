'use strict';

angular.module('app.frontpage.controller', [])
    .config(['$stateProvider',
        function ($stateProvider) {
            $stateProvider
                .state('main.frontpage', {
                    url: '/home',
                    templateUrl: '_public/frontend/partials/frontpage/frontpage.html',
                    controller: 'FrontpageController'
                });
        }])
    .controller('FrontpageController', ['$scope',
        function ($scope) {

        }]);