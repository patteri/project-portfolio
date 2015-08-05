'use strict';

angular.module('app.management.controller', [])
    .config(['$stateProvider',
        function ($stateProvider) {
            $stateProvider
                .state('main.management', {
                    url: '/management',
                    templateUrl: 'partials/management/management.html',
                    controller: 'ManagementController',
                    authenticate: true,
                    resolve: {
                        projects: ['Projects', function (Projects) {
                            return Projects.query().$promise;
                        }]
                    }
                });
        }])
    .controller('ManagementController', ['$scope', 'projects',
        function ($scope, projects) {
            $scope.projects = projects;
        }]);