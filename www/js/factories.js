angular.module('starter.factories', [])
    .constant("Config", {
        "url": "https://mayfresh.herokuapp.com"
    })
    .factory('DecodeToken', function ($window) {
        return {
            decode: function (token) {
                token = token || $window.sessionStorage.token;
                if (token) {
                    var base64Url = token.split('.')[1];
                    var base64 = base64Url.replace('-', '+').replace('_', '/');
                    $window.sessionStorage.user = JSON.parse($window.atob(base64)).username;
                    return JSON.parse($window.atob(base64));
                }
            }
        }
    })
    .factory('AuthInterceptor', function ($rootScope, $q, $window) {
        return {
            request: function (config) {
                config.body = config.body || {};
                config.headers = config.headers || {};
                if ($window.sessionStorage.token) {
                    config.body.token = $window.sessionStorage.token;
                    config.headers['x-access-token'] = $window.sessionStorage.token;
                }
                return config;
            },
            responseError: function (response) {
                if (response.status === 401 || response.status === 403) {
                    $window.location.href = '#/app/login';
                    
                }
                return $q.reject(response);
            }
        };
    });