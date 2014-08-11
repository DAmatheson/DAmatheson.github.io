/* services.js
    Purpose: Angular services for BoardGameScorer

    Revision History:
        Drew Matheson, 2014.5.1: Created
        Drew Matheson, 2014.5.2: Added Game resource
*/

/// <reference path="angular-resource/angular-resource.js"/>

'use strict';

/* Services */

var bgsServices = angular.module('boardGameScorer.services', ['ngResource']);

bgsServices.value('version', '0.0.3');

// Resource for games
bgsServices.factory('Game', ['$resource',
    function ($resource)
    {
        return $resource('dbGames/:gameId.json', {},
        {
            query: // query method of the Game resource
            {
                method: 'GET',
                params:
                {
                    gameId: 'games' // get the file games.json
                },
                isArray: true
            }
        });
    }
]);

// Resource for game sessions
bgsServices.factory('GameSession', ['$resource',
    function ($resource)
    {
        return $resource('dbGameSessions/:sessionId.json', {},
        {
            query:
            {
                method: 'GET',
                params:
                {
                    sessionId: 'sessions' // get the file sessions.json
                },
                isArray: true
            }
        });
    }
]);
