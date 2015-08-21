angular.module('starter', ['ionic', 'starter.controllers','starter.factories'])
    .run(function ($ionicPlatform, $rootScope, $state, $ionicPopup) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });

        $rootScope.$on('message:success', function (e, message) {
            var alertPopup = $ionicPopup.alert({
                title: 'Message',
                template: message,
                buttons: [
                    {
                        text: 'OK',
                        type: 'button-positive'
                    }
                ]
            });
            alertPopup.then(function (res) {

            });
        });
        $rootScope.$on('message:error', function (e, message) {
            var alertPopup = $ionicPopup.alert({
                title: 'Message',
                template: message,
                buttons: [
                    {
                        text: 'OK',
                        type: 'button-assertive'
                    }
                ]
            });
            alertPopup.then(function (res) {

            });
        });
    })

.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
    $stateProvider

        .state('app', {
        url: "/app",
        abstract: true,
        templateUrl: "templates/menu.html",
        controller: 'AppCtrl'
    })

    .state('app.main', {
            url: "/main",
            views: {
                'menuContent': {
                    templateUrl: "templates/main.html",
                    controller: 'MainCtrl'
                }
            }
        })
        .state('app.balance', {
            url: "/balance",
            views: {
                'menuContent': {
                    templateUrl: "templates/balance.html",
                    controller: "BalanceCtrl"
                }
            }
        })
        .state('app.transfer', {
            url: "/transfer",
            views: {
                'menuContent': {
                    templateUrl: "templates/transfer.html",
                    controller: "TransferCtrl"
                }
            }
        })
        .state('app.login', {
            url: "/login",
            views: {
                'menuContent': {
                    templateUrl: "templates/login.html",
                    controller: 'AuthCtrl'
                }
            }
        })
        .state('app.recharge', {
            url: "/recharge",
            views: {
                'menuContent': {
                    templateUrl: "templates/recharge.html",
                }
            }
        })
        .state('app.profile', {
            url: "/profile",
            views: {
                'menuContent': {
                    templateUrl: "templates/profile.html",
                    controller: 'ProfileCtrl'
                }
            }
        })
        .state('app.care', {
            url: "/care",
            views: {
                'menuContent': {
                    templateUrl: "templates/care.html",
                }
            }
        })
        .state('app.single', {
            url: "/playlists/:playlistId",
            views: {
                'menuContent': {
                    templateUrl: "templates/playlist.html",
                    controller: 'PlaylistCtrl'
                }
            }
        });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/main');
    $httpProvider.interceptors.push('AuthInterceptor');
});