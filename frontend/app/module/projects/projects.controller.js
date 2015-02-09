'use strict';

angular.module('app.projects.controller', [])
    .config(['$stateProvider',
        function ($stateProvider) {
            $stateProvider
                .state('main.projects', {
                    url: '/projects',
                    templateUrl: 'partials/projects/projects.html',
                    controller: 'ProjectsController'
                });
        }])
    .controller('ProjectsController', ['$scope', 'Contents',
        function ($scope, Contents) {
            $scope.projects = Contents.projects;
            $scope.projectTypes = [];
            $scope.tags = null;

            // Scope methods
            $scope.projectFilter = projectFilter;

            // Construct project types
            var types = _.uniq(_.map(Contents.projects, 'type'));
            _.each(types, function (type) {
                $scope.projectTypes.push({name: type, count: _.filter($scope.projects, {'type': type}).length, selected: false});
            });

            // Construct tags
            var tagMap = {};
            _.each($scope.projects, function (project) {
                _.each(project.tags, function (tag) {
                    if (!(tag in tagMap)) {
                        tagMap[tag] = 0;
                    }
                    tagMap[tag] = ++tagMap[tag];
                });
            });
            var tempTags = [];
            for (var key in tagMap) {
                tempTags.push({name: key, count: tagMap[key], selected: false});
            }
            $scope.tags = _.sortBy(tempTags, 'count').reverse();

            function projectFilter(project) {
                var selectedTypes = _.map(_.filter($scope.projectTypes, 'selected'), 'name');
                var selectedTags = _.map(_.filter($scope.tags, 'selected'), 'name');
                return (selectedTypes.length === 0 || selectedTypes.indexOf(project.type) != -1) &&
                    (selectedTags.length === 0 || hasTags(project, selectedTags));
            }

            function hasTags(project, tags) {
                for (var i = 0; i < tags.length; ++i) {
                    if (project.tags.indexOf(tags[i]) == -1) {
                        return false;
                    }
                }
                return true;
            }
        }]);