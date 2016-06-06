'use strict';

var app = angular.module('pinchApp');

app.service('Account', function($http) {
    this.getCurrentUser = () => {
        return $http({
            method: 'GET',
            url: '/api/users/own'
        });
    }
});
