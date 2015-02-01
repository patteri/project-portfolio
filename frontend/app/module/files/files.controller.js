'use strict';

angular.module('app.files.controller', [])
    .config(['$stateProvider',
        function ($stateProvider) {
            $stateProvider
                .state('main.files', {
                    url: '/cv',
                    templateUrl: '_public/frontend/partials/files/files.html',
                    controller: 'FilesController'
                });
        }])
    .controller('FilesController', ['$scope',
        function ($scope) {
        }]);