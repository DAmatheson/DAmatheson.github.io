'use strict';

var rlServices = angular.module('readList.services', ['ngResource']);

rlServices.value('version', '0.0.1');

// Resource for readList
rlServices.factory('readListResource', ['$resource',
    function ($resource)
    {
        return $resource('https://dl.dropboxusercontent.com/u/1377344/:file.json', 
            {file: 'ReadList'},
        {
            query:
            {
                method: 'GET',
                isArray: true
            }
        });
    }
]);