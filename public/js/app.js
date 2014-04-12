'use strict';


// Declare app level module which depends on filters, and services
var app = angular.module('similarweb', [
    'ngRoute',
    'similarweb.filters',
    'similarweb.services',
    'similarweb.directives',
    'similarweb.controllers'
]);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {controller: 'MainController'});
    $routeProvider.when('/result/:searchQ', {controller: 'MainController'});
    $routeProvider.otherwise({redirectTo: '/'});
}]);

app.constant('API_KEY', 'a6fd04d833f2c28ce7c30dc957bf481e');
app.constant('MAX_ITEMS', 12);
