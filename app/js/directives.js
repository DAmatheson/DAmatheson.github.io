/* directives.js
    Purpose: Angular directives for BoardGameScorer

    Revision History:
        Drew Matheson, 2014.5.1: Created
*/

'use strict';

/* Directives */

var bgsDirectives = angular.module('boardGameScorer.directives', []);

bgsDirectives.directive('appVersion', ['version', 
    function(version) 
    {
        return function(scope, elm, attrs) 
        {
            elm.text(version);
        };
    }
]);
