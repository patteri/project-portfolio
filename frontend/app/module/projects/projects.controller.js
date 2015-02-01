'use strict';

angular.module('app.projects.controller', [])
    .config(['$stateProvider',
        function ($stateProvider) {
            $stateProvider
                .state('main.projects', {
                    url: '/projects',
                    templateUrl: '_public/frontend/partials/projects/projects.html',
                    controller: 'ProjectsController'
                });
        }])
    .controller('ProjectsController', ['$scope', 'Contents',
        function ($scope, Contents) {
            $scope.projects = Contents.projects;

            $scope.getTagString = function (tags) {
                return tags.join(', ');
            };
        }]);