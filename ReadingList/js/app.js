'use strict';

// Declare app level module and its dependencies
var rlApp = angular.module('readList', [
    'ngRoute',
    'readList.filters',
    'readList.services',
    'readList.controllers'
]);

rlApp.config(['$routeProvider', 
    function($routeProvider) 
    {
        $routeProvider.when('/', 
        {
            templateUrl: 'partials/readList.html', 
            controller: 'readListController'
        });
    }
]);
