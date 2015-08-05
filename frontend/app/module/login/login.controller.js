'use strict';

angular.module('app.login.controller', [])
    .config(['$stateProvider',
        function ($stateProvider) {
            $stateProvider
                .state('main.login', {
                    url: '/login',
                    templateUrl: 'partials/login/login.html',
                    controller: 'LoginController'
                });
        }])
    .controller('LoginController', ['$scope', '$state', 'Login', 'AuthService',
        function ($scope, $state, Login, AuthService) {
            $scope.user = {username: null, password: null};
            $scope.error = false;

            // Scope methods
            $scope.login = login;

            function login () {
                Login.save({username: $scope.user.username, password: $scope.user.password}, function (data) {
                    $scope.user.password = null;
                    $scope.error = false;
                    AuthService.login(data);
                    $state.go('main.management');
                }, function (err) {
                    $scope.error = true;
                });
            }
        }]);