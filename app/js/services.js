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

bgsServices.value('version', '0.0.1');

bgsServices.factory('Game', ['$resource',
    function ($resource)
    {
        return $resource('games/:gameId.json', {},
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
