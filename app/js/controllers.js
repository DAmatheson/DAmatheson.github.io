/* controllers.js
    Purpose: Angular controllers for BoardGameScorer

    Revision History:
        Drew Matheson, 2014.5.1: Created
        Drew Matheson, 2014.5.2: Renamed, recreated ctrlGameList and ctrlGameDetail
*/

/// <reference path="angular/angular.js"/>
/// <reference path="angular-route/angular-route.js"/>

'use strict';

/* Controllers */

var bgsControllers = angular.module('boardGameScorer.controllers', []);

bgsControllers.controller('ctrlGameList', ['$scope', 'Game',
    function ($scope, Game)
    {
        $scope.games = Game.query();
    }
]);
  
bgsControllers.controller('ctrlGameDetail', ['$scope', "$routeParams", 'Game',
    function($scope, $routeParams, Game)
    {
        $scope.game = Game.get({ gameId: $routeParams.gameId }, function(data)
        {
            $scope.mainImageUrl = data.images[0];
        });
    }
]);
