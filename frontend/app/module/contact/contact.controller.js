'use strict';

angular.module('app.contact.controller', [])
    .config(['$stateProvider',
        function ($stateProvider) {
            $stateProvider
                .state('main.contact', {
                    url: '/home',
                    templateUrl: '_public/frontend/partials/contact/contact.html',
                    controller: 'ContactController'
                });
        }])
    .controller('ContactController', ['$scope',
        function ($scope) {
        }]);