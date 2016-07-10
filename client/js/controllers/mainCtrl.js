'use strict';

var app = angular.module('pinchApp');

app.controller('mainCtrl', function($http, $scope, $auth, Account, $rootScope, $timeout, $window, $state, $firebaseAuth) {


    // var ref = new Firebase("https://projects-44c76.firebaseio.com/");


    console.log('mainCtrl loaded');
    $scope.currentUser = '';
    $scope.loginloading = false;
    $scope.authenticate = (provider) => {
        $scope.loginloading = true;
        $auth.authenticate(provider).then(data => {
            $timeout(function() {
                Account.getCurrentUser().then(res => {
                    console.log('user logged in: ', res.data);
                    $scope.currentUser = res.data;
                    $scope.loginloading = false;
                }, err => {
                    console.log('user is not logged in.');
                })
            }, 0)
        }, err => {
            console.log('err when log user in: ', err);
        })
    }

    if ($auth.isAuthenticated()) {
        Account.getCurrentUser().then(res => {
            $scope.currentUser = res.data;
        }, err => {
            console.log('user is not logged in.');
        })
    }


    $scope.isAuthenticated = () => {
        return $auth.isAuthenticated();
    }

    $scope.logout = () => {
        $auth.logout();
        $state.go('home')
        $window.location.reload();
    }
});
