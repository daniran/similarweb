'use strict';

/* Directives */


var directives = angular.module('similarweb.directives', []);

directives.directive('history', function() {
    return {
        restrict: 'E',
        templateUrl: 'partials/history.html',
        link: {
            post: function(scope, elem, attrs) {
                // close handler
                elem.bind('close.bs.alert', function(event) {
                    // add fade effect
                    $(event.target).closest('.alert').addClass('fade');
                });
                elem.bind('closed.bs.alert', function(event) {
                    // close done
                });
            }}
    };
});

directives.directive('result', function() {
    return {
        restrict: 'E',
        templateUrl: 'partials/result.html',
        link: {
            post: function(scope, elem, attrs) {
                // bootstrap tooltips
                elem.tooltip();
            }
        }
    }
});

directives.directive('resultHeader', function() {
    return {
        restrict: 'E',
        templateUrl: 'partials/result-header.html'
    };
});