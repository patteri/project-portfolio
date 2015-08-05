'use strict';

angular.module('common.api.services', [])
    .factory('Login', ['$resource', function ($resource) {
        return $resource('api/login', {});
    }])
    .factory('Files', ['$resource', function ($resource) {
        return $resource('api/files', {}, {
            query: {
                method: 'GET',
                isArray: true
            }
        });
    }])
    .factory('Links', ['$resource', function ($resource) {
        return $resource('api/links', {}, {
            query: {
                method: 'GET',
                isArray: true
            }
        });
    }])
    .factory('Projects', ['$resource', function ($resource) {
        return $resource('api/projects', {}, {
            query: {
                method: 'GET',
                isArray: true
            }
        });
    }]);
