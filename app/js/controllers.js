/* controllers.js
    Purpose: Angular controllers for BoardGameScorer

    Revision History:
        Drew Matheson, 2014.5.1: Created
        Drew Matheson, 2014.5.2: Renamed, recreated ctrlGameList and ctrlGameDetail
        Drew Matheson, 2014.5.3: Added ctrlSessionList and ctrlSessionDetail
*/

/// <reference path="angular/angular.js"/>
/// <reference path="angular-route/angular-route.js"/>

'use strict';

/* Controllers */

var bgsControllers = angular.module('boardGameScorer.controllers', []);

// Controller for the partial gameList.html
bgsControllers.controller('ctrlGameList', ['$scope', 'Game',
    function ($scope, game)
    {
        $scope.games = game.query(); // Get all the games
    }
]);
  
// Controller for the partial gameDetail.html
bgsControllers.controller('ctrlGameDetail', ['$scope', '$routeParams', 'Game',
    function($scope, $routeParams, game)
    {
        $scope.game = game.get({ gameId: $routeParams.gameId }, 
            function(data)
            {
                $scope.mainImageUrl = data.images[0];
            }
        );
    }
]);

// Controller for the partial sessionList.html
bgsControllers.controller('ctrlSessionList', ['$scope', 'GameSession',
    function($scope, gameSession)
    {
        $scope.sessions = gameSession.query(); // Get all the sessions
    }
]);

// Controller for the partial sessionDetail.html
bgsControllers.controller('ctrlSessionDetail', ['$scope', '$routeParams', '$filter', 'GameSession',
    function ($scope, $routeParams, $filter, gameSession)
    {
        $scope.sessionDetails = gameSession.get({ sessionId: 'session' + $routeParams.sessionId + 'Details' },
            function(data)
            {
                $scope.gameName = data.gameName;
                $scope.date = data.date;
                $scope.time = data.time;
                $scope.winnerName = $filter('winnerName')(data.players);
                $scope.winningAmount = $filter('winningAmount')(data.players);
                $scope.players = data.players;
                $scope.playersByRank = $filter('byRank')(data.players);
            }
        );
    }
]);
