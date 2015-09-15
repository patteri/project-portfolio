'use strict';

angular.module('common.auth.service', [])
    .run(['$rootScope', '$state', 'AuthService', function ($rootScope, $state, AuthService) {
        function authRequired (state) {
            return state.authenticate;
        }

        $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
            if (authRequired(toState) && !AuthService.isAuthenticated()) {
                event.preventDefault();
                $state.go("main.login");
            }
        });
    }])
    .factory('AuthService', ['$rootScope', '$window', '$state', '$sessionStorage', function ($rootScope, $window, $state, $sessionStorage) {
        var authenticated = false;
        var authData = null;

        function isAuthenticated () {
            if (!authenticated) {
                authenticated = $sessionStorage.token && $sessionStorage.token.expires > Date.now() && $sessionStorage.user;
            }
            return authenticated;
        }

        return {
            isAuthenticated: function () {
                return isAuthenticated();
            },
            login: function (data) {
                authData = data;
                $sessionStorage.token = {token: data.token, expires: data.expires};
                $sessionStorage.user = data.user;
                authenticated = true;
            },
            logout: function () {
                authenticated = false;
                $sessionStorage.$reset();
            },
            getUser: function () {
                return $sessionStorage.user;
            }
        };
    }])
    .factory('TokenInterceptor', ['$sessionStorage', function ($sessionStorage) {
        return {
            request: function (config) {
                config.headers = config.headers || {};
                if ($sessionStorage.token) {
                    config.headers['X-Access-Token'] = $sessionStorage.token.token;
                }
                return config;
            }
        };
    }]);