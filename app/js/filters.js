/* filters.js
    Purpose: Angular filters for BoardGameScorer

    Revision History:
        Drew Matheson, 2014.5.1: Created
*/

'use strict';

/* Filters */

var bgsFilters = angular.module('boardGameScorer.filters', []);

bgsFilters.filter('interpolate', ['version', 
    function(version) 
    {
        return function(text) 
        {
            return String(text).replace(/\%VERSION\%/mg, version);
        };
    }
]);

//<p>
//    Showing of 'interpolate' filter:
//{{ 'Current version is v%VERSION%.' | interpolate }}
//</p>