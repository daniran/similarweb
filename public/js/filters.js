'use strict';

/* Filters */

var filters = angular.module('similarweb.filters', []);

// category filter
filters.filter('category', function($filter) {
    return function(category) {
        if(!category)
            return '';
        return category.replace(/_/g, ' ');
    }
});
