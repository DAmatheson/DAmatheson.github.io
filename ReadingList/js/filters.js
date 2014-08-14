'use strict';

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

rlFilters.filter('prettyLink', 
    function()
    {
        return function(text)
        {
            // Remove http//:, https://, and www. from the start of a Url
            return String(text).replace(/^(http)?s?(\:\/\/)?(www.)?/i, "");
        }
    }
);

rlFilters.filter('absoluteLink', 
    function()
    {
        return function(input)
        {
            // Adds http:// to the start of a url if http:// or https:// doesn't exist
            return input.search(/^https?:\/\//i) > -1 ? input : "http://" + input;
        }
    }
);


//<p>
//    Showing of 'interpolate' filter:
//{{ 'Current version is v%VERSION%.' | interpolate }}
//</p>