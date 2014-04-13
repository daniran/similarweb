'use strict';

/* Services */

var services = angular.module('similarweb.services', ['ngResource']);

// Search service
services.factory('SearchService', ['$resource', 'API_KEY',
    function($resource, API_KEY) {
        return $resource('http://api.similarweb.com/Site/:searchQ/v2/rankoverview?Format=JSON&UserKey=' + API_KEY);
    }]);

// Search History Service
services.factory('SearchHistoryService', ['$rootScope', '$window', '$document',
    function($rootScope, $window, $document) {
        return {
            storage: $window.localStorage,
            key: 'similarweb_search_history',
            getAll: function() {
                var value = this.storage.getItem(this.key);
                return value ? angular.fromJson(value) : [];
            },
            add: function(data) {
                var all = this.getAll();
                // check for existence
                var exists = all.some(function(item) {
                    var match = item.url == data.url;
                    if(match)
                        item.time = Date.now();
                    return  match;
                });
                if(exists)
                    return;

                all.push(data);
                this.storage.setItem(this.key, angular.toJson(all));
            },
            deleteItem: function(item) {
                var all = this.getAll();
                all = all.filter(function(obj) {
                    return obj.url != item.url;
                });
                this.storage.setItem(this.key, angular.toJson(all));
            }
        }
    }]);