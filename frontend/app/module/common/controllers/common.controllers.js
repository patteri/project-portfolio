'use strict';

angular.module('common.controllers', [])
    .controller('NavController', ['$scope', '$state', 'AuthService',
        function ($scope, $state, AuthService) {
            $scope.auth = AuthService;

            $scope.logout = function () {
                AuthService.logout();
                $state.go('main.login');
            };
        }]);