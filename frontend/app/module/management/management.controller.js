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
    .controller('ManagementController', ['$scope', 'Upload', 'Projects', 'projects',
        function ($scope, Upload, Projects, projects) {
            $scope.projects = projects;
            var orgProject = null;
            $scope.selectedProject = null;
            $scope.datepicker = { startTime: {open: false}, endTime: {open: false} };

            // Scope methods
            $scope.selectProject = selectProject;
            $scope.createNewProject = createNewProject;
            $scope.removeItem = removeItem;
            $scope.addItem = addItem;
            $scope.uploadImage = uploadImage;
            $scope.save = save;
            $scope.deleteProject = deleteProject;
            $scope.cancel = cancel;
            $scope.openDatePicker = openDatePicker;

            function selectProject (project) {
                orgProject = project;
                $scope.selectedProject = _.cloneDeep(project);
            }

            function createNewProject () {
                selectProject({name: null, startTime: null, endTime: null, type: null, shortDescription: null, description: null, tags: [], link: null, images: []});
            }

            function addItem (list, item) {
                list.push(item);
            }

            function removeItem (list, item) {
                _.remove(list, function (item2) { return item == item2; });
            }

            function uploadImage (file) {
                if (file) {
                    Upload.upload({
                        url: '/api/admin/projects/image',
                        file: file
                    }).success(function (data, status, headers, config) {
                        addItem($scope.selectedProject.images, data.file);
                    }).error(function (data, status) {
                        console.log('Image upload failed: ' + status);
                    });
                }
            }

            function save () {
                // Convert Date objects to JSON strings
                if ($scope.selectedProject.startTime && typeof $scope.selectedProject.startTime === "object") {
                    $scope.selectedProject.startTime = $scope.selectedProject.startTime.toJSON();
                }
                if ($scope.selectedProject.endTime && typeof $scope.selectedProject.endTime === "object") {
                    $scope.selectedProject.endTime = $scope.selectedProject.endTime.toJSON();
                }

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

            function openDatePicker ($event, picker) {
                $event.preventDefault();
                $event.stopPropagation();
                picker.open = !picker.open;
            }
        }]);