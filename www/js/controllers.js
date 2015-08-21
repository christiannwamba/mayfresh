var app = angular.module('starter.controllers', ['starter.factories']);

app.controller('AppCtrl', function ($scope, $rootScope, $state, $window, DecodeToken) {
    if (DecodeToken.decode()) {
        $scope.username = DecodeToken.decode().username
    };
    $scope.logout = function () {
        delete $window.sessionStorage.token;
        $state.go('app.login');
    };
});

app.controller('MainCtrl', function ($scope, $ionicHistory, $state, $http, Config, DecodeToken, $window, $ionicLoading) {
    $ionicHistory.clearHistory();    
    $scope.account = DecodeToken.decode($window.sessionStorage.token) || {};
    $http.get(Config.url + '/api/transactions/' + $scope.account._id).success(function (data) {        
        $scope.transactions = data;
    })
});

app.controller('AuthCtrl', function ($scope, $state, $window, $http, $rootScope, Config, DecodeToken, $ionicLoading, $ionicHistory) {
    $ionicHistory.clearHistory();    
    $scope.user = {};
    $scope.login = function () {
        $ionicLoading.show({
            template: 'Loading <ion-spinner icon="ripple"></ion-spinner>'
        });
        $http.post(Config.url + '/api/authenticate', $scope.user).success(function (data) {
            $window.sessionStorage.token = data.token;
            $rootScope.account = DecodeToken.decode(data.token);
            $rootScope.$emit('message:success', data.message);
            $ionicLoading.hide();
            $window.location.href = '#/app/main';
        }).error(function (data) {
            delete $window.sessionStorage.token;
            $rootScope.$emit('message:error', data.message);
            $ionicLoading.hide();
        })
    };
});

app.controller('BalanceCtrl', function ($scope, $state, $http, Config, DecodeToken) {
    $scope.account = DecodeToken.decode() || {};
});

app.controller('TransferCtrl', function ($scope, $state, $http, DecodeToken, $rootScope, Config, $ionicLoading) {
    $rootScope.account = DecodeToken.decode() || {};
    $scope.transfer = {};

    $scope.send = function () {
        $ionicLoading.show({
            template: 'Loading <ion-spinner icon="ripple"></ion-spinner>'
        });
        $scope.transfer.sender = $scope.account.username;
        $http.post(Config.url + '/api/transfer', $scope.transfer).success(function (data) {
            $rootScope.account = DecodeToken.decode() || {};
            $rootScope.$emit('message:success', data.message);
            $ionicLoading.hide();
        }).error(function (data) {
            $rootScope.$emit('message:error', data.message);
            $ionicLoading.hide();
        });
    };
});

app.controller('TransactionCtrl', function ($scope, $state) {

});

app.controller('ProfileCtrl', function ($scope, $state, DecodeToken) {
    $scope.account = DecodeToken.decode();
});

app.directive('welcome', function () {
    return {
        restrict: 'E',
        scope: {
            message: '='
        },
        template: '<div class="card"><div class="item item-text-wrap" style="text-align:center">Welcome: <strong  style="text-transform:uppercase">{{message}}</strong></div></div>'
    }
});