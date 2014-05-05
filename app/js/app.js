/* app.js
    Purpose: Angular app and routes for BoardGameScorer

    Revision History:
        Drew Matheson, 2014.5.1: Created
        Drew Matheson, 2014.5.2: Added the routes /games, /games/:gameId, and redid the default
*/

'use strict';

// Declare app level module which depends on filters, and services
var boardGameScorer = angular.module('boardGameScorer', [
    'ngRoute',
    'boardGameScorer.filters',
    'boardGameScorer.services',
    'boardGameScorer.directives',
    'boardGameScorer.controllers'
]);

boardGameScorer.config(['$routeProvider', '$locationProvider', 
    function($routeProvider, $locationProvider) 
    {
        $routeProvider.when('/games', 
        {
            templateUrl: 'partials/gameList.html', 
            controller: 'ctrlGameList'
        });
        
        $routeProvider.when('/games/:gameId', 
        {
            templateUrl: 'partials/gameDetail.html', 
            controller: 'ctrlGameDetail'
        });

        $routeProvider.when('/gameSessions',
        {
            templateUrl: 'partials/sessionList.html',
            controller: 'ctrlSessionList'
        });

        $routeProvider.when('/gameSessions/:sessionId',
        {
            templateUrl: 'partials/sessionDetail.html',
            controller: 'ctrlSessionDetail'
        });
        
        $routeProvider.otherwise(
        {
            templateUrl: 'partials/home.html',
            redirectTo: 'index'
        });

        // use HTML5 History API (Removes /#/ after domain but requires server Rewrites config)
        //$locationProvider.html5Mode(true); // Comment out when uploading for hosting on github
    }
]);
