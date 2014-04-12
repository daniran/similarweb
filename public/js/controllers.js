'use strict';

/* Controllers */

var controllers = angular.module('similarweb.controllers', []);

controllers.controller('MainController', ['$scope', '$route', '$location', 'SearchService', 'SearchHistoryService', '$sce', 'MAX_ITEMS', '$log',
    function($scope, $route, $location, SearchService, SearchHistoryService, $sce, MAX_ITEMS, $log) {

        $scope.all_history = SearchHistoryService.getAll();

        $scope.$on('$routeChangeSuccess', function() {
            if($route.current.params && $route.current.params.searchQ) {
                $scope.searchQ = $route.current.params.searchQ;
                SearchService.get(
                    { searchQ: $scope.searchQ },
                    function(result) {
                        $scope.isError = false;
                        $scope.showAll = false;
                        $scope.siteData = result;
                        SearchHistoryService.add({ url: $scope.searchQ, time: Date.now() })
                        $scope.all_history = SearchHistoryService.getAll();
                        $scope.MAX_ITEMS = MAX_ITEMS;
                        $scope.iframe_url = $sce.trustAsResourceUrl('http://' + $scope.searchQ);
                    },
                    function(response) {
                        $log.error("Error while searching: '" + $scope.searchQ + "'");
                        $scope.isError = true;
                    });
            }
        });

        $scope.search = function() {
            $scope.siteData = null;
            var q = $scope.searchQ;
            if(!q)
                return;
            $location.path('/result/' + q);
            $route.reload();
        };

        $scope.deleteItem = function(item, $event) {
            SearchHistoryService.deleteItem(item);
        }

        $scope.showResults = function(item, $event) {
            // don't show if the delete button was clicked
            if($($event.target).hasClass('close'))
                return;
            $scope.siteData = null;
            $location.path('/result/' + item.url);
            $route.reload();
        }

    }]);
