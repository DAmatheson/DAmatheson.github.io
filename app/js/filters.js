/* filters.js
    Purpose: Angular filters for BoardGameScorer

    Revision History:
        Drew Matheson, 2014.5.1: Created
*/

/// <reference path="angular/angular.js"/>

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

// Returns the player with the highest score
// Should this be moved into the ctrlGameSessionDetails controller?
bgsFilters.filter('winnerName',
    function ()
    {
        return function(players)
        {
            var highestScorer = "";
            var highestScore = -1;

            for (var i = 0; i < players.length; i++)
            {
                if (players[i].score > highestScore)
                {
                    highestScore = players[i].score;
                    highestScorer = players[i].name;
                }
            }

            return highestScorer;
        };
    }
);

bgsFilters.filter('winningAmount',
    function()
    {
        return function(players)
        {
            var highestScore = -1; // Stores the highest score
            var secondScore = -1; // Stores the second highest score

            for (var i = 0; i < players.length; i++)
            {
                if (players[i].score > highestScore)
                {
                    secondScore = highestScore; // Move the highest score into the second highest score
                    highestScore = players[i].score; // Update the highest score
                }
            }

            return highestScore - secondScore; // Return the difference between first and second
        }
    }
);

bgsFilters.filter('byRank',
    function()
    {
        return function(players)
        {
            for (var i = 0; i < players.length; i++)
            {
                var sorted = true; // Flag for whether sorting is complete

                for (var j = i + 1; j < players.length; j++)
                {
                    if (players[i].score < players[j].score)
                    {
                        players = swapPlaces(i, j, players);
                        sorted = false;
                    }
                }

                if (sorted)
                {
                    break; // Sorting is complete, stop early
                }
            }

            return players;
        }
    }
);

function swapPlaces(lowIndex, highIndex, collection)
{
    var lowValue = collection[lowIndex]; // Hold the low index value
    collection[lowIndex] = collection[highIndex]; // Replace low index with high index value
    collection[highIndex] = lowValue; // Replace high index with low index value
    
    return collection;
}

//<p>
//    Showing of 'interpolate' filter:
//{{ 'Current version is v%VERSION%.' | interpolate }}
//</p>