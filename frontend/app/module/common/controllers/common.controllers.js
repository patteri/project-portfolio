'use strict';

angular.module('common.controllers', [])
    .controller('NavController', ['$scope', 'AuthService',
        function ($scope, AuthService) {
            $scope.auth = AuthService;
        }]);