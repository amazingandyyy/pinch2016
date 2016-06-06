'use strict';

var app = angular.module('pinchApp', ['ui.router', 'satellizer']);

app.config(function($stateProvider, $urlRouterProvider, $authProvider) {

    $authProvider
        .facebook({
            clientId: '298165113849366'
        });

    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: '/html/home.html',
            controller: 'homeCtrl'
        })
        .state('profile', {
            url: '/profile',
            templateUrl: '/html/profile.html',
            controller: 'profileCtrl'
        })

    $urlRouterProvider.otherwise('/');
});
