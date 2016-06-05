'use strict';

var app = angular.module('pinchApp', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: '/html/home.html',
            controller: 'mainCtrl'
        })

    $urlRouterProvider.otherwise('/');
});
