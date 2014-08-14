/* filters.js
    Purpose: Angular filters for BoardGameScorer

    Revision History:
        Drew Matheson, 2014.5.1: Created
*/

/// <reference path="angular/angular.js"/>

'use strict';

/* Filters */

var rlFilters = angular.module('readList.filters', []);

rlFilters.filter('interpolate', ['version', 
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