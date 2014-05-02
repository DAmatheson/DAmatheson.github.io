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

boardGameScorer.config(['$routeProvider', 
    function($routeProvider) 
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
        
        $routeProvider.otherwise(
        {
            templateUrl: 'partials/home.html',
            redirectTo: '/index'
        });
    }
]);
