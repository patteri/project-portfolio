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
    .controller('ManagementController', ['$scope', 'Projects', 'projects',
        function ($scope, Projects, projects) {
            $scope.projects = projects;
            var orgProject = null;
            $scope.selectedProject = null;
            $scope.inputs = {tag: null, file: null};

            // Scope methods
            $scope.selectProject = selectProject;
            $scope.createNewProject = createNewProject;
            $scope.removeItem = removeItem;
            $scope.addItem = addItem;
            $scope.save = save;
            $scope.deleteProject = deleteProject;
            $scope.cancel = cancel;

            function selectProject (project) {
                orgProject = project;
                $scope.selectedProject = _.cloneDeep(project);
            }

            function createNewProject () {
                selectProject({name: null, time: null, type: null, shortDescription: null, description: null, tags: [], link: null, images: []});
            }

            function addItem (list, item) {
                list.push(item);
            }

            function removeItem (list, item) {
                _.remove(list, function (item2) { return item == item2; });
            }

            function save () {
                if ($scope.selectedProject._id) {
                    Projects.update({id: $scope.selectedProject._id}, $scope.selectedProject, function () {
                        var index = _.findIndex($scope.projects, {_id: $scope.selectedProject._id});
                        $scope.projects[index] = $scope.selectedProject;
                        selectProject($scope.selectedProject);
                    }, function (err) {
                        console.log(err);
                    });
                }
                else {
                    Projects.save($scope.selectedProject, function (data) {
                        var response = data.toJSON();
                        $scope.projects.push(response);
                        selectProject(response);
                    }, function (err) {
                        console.log(err);
                    });
                }
            }

            function deleteProject () {
                Projects.delete({id: $scope.selectedProject._id}, function () {
                    _.remove($scope.projects, function (item) { return item._id == $scope.selectedProject._id; });
                    selectProject(null);
                }, function (err) {
                    console.log(err);
                });
            }

            function cancel () {
                selectProject(orgProject);
            }
        }]);