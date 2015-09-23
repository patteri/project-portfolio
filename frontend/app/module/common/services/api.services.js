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
            },
            save: {
                url: 'api/admin/projects',
                method: 'POST'
            },
            update: {
                url: 'api/admin/projects/:id',
                method: 'PUT',
                params: {id: '@id'}
            },
            delete: {
                url: 'api/admin/projects/:id',
                method: 'DELETE',
                params: {id: '@id'}
            }
        });
    }]);
