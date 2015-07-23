'use strict';

angular.module('common.templates.imageModal', [])
    .controller('ImageModalController', ['$scope', '$modalInstance', 'imageSource',
        function ($scope, $modalInstance, imageSource) {
            $scope.imageSource = imageSource;

            $scope.close = function () {
                $modalInstance.close();
            };
        }]);