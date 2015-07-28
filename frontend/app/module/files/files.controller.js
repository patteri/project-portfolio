'use strict';

angular.module('app.files.controller', [])
    .config(['$stateProvider',
        function ($stateProvider) {
            $stateProvider
                .state('main.files', {
                    url: '/cv',
                    templateUrl: 'partials/files/files.html',
                    controller: 'FilesController',
                    resolve: {
                        files: ['Files', function (Files) {
                            return Files.query().$promise;
                        }],
                        links: ['Links', function (Links) {
                            return Links.query().$promise;
                        }]
                    }
                });
        }])
    .controller('FilesController', ['$scope', 'files', 'links',
        function ($scope, files, links) {
            $scope.files = files;
            $scope.links = links;
        }]);