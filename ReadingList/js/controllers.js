'use strict';

var rlControllers = angular.module('readList.controllers', []);

// Controller for the partial gameList.html
rlControllers.controller('readListController', ['$scope', 'readListResource',
    function ($scope, readListResource)
    {
        $scope.readList = readListResource.query(); // Get all the games
    }
]);