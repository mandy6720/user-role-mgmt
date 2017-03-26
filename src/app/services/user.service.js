(function() {
  'use strict';

  angular
    .module('kitcheck')
    .factory('userService', userService);

    function userService($http, $cacheFactory, config) { //$http, $q, config

      // http stuff
      var baseUrl = config.baseUrl;

      var requestParams = function(params) {
        var userParams = params;

        userParams.responseType = 'json';
        if (!userParams.headers) {userParams.headers = {};}
        userParams.headers['Content-Type'] = 'application/json';
        userParams.headers['Authorization'] = 'Token token=' + config.token;
        return userParams;
      };

      var users = {
        getAllUsers: function() {
          var httpCache = $cacheFactory.get('$http');
          httpCache.removeAll();

          return $http(requestParams({
              method: 'GET',
              cache: true,
              url: baseUrl + '/user'
          }));
        },
        getUserById: function(id) {
          var httpCache = $cacheFactory.get('$http');
          httpCache.removeAll();

          return $http(requestParams({
              method: 'GET',
              cache: true,
              url: baseUrl + '/user/' + id
          }));
        },
        addUser: function(data) {
          var httpCache = $cacheFactory.get('$http');
          httpCache.removeAll();

          return $http(requestParams({
              method: 'POST',
              cache: true,
              url: baseUrl + '/user/',
              data: data
          }));
        },
        deleteUser: function(id) {
          var httpCache = $cacheFactory.get('$http');
          httpCache.removeAll();

          return $http(requestParams({
              method: 'DELETE',
              cache: true,
              url: baseUrl + '/user/' + id
          }));
        },
        updateUser: function(id, data) {
          var httpCache = $cacheFactory.get('$http');
          httpCache.removeAll();

          return $http(requestParams({
              method: 'PUT',
              cache: true,
              url: baseUrl + '/user/' + id,
              data: data
          }));
        }

      };

      var accounts = {
        getAllAccountTypes: function() {
          var httpCache = $cacheFactory.get('$http');
          httpCache.removeAll();

          return $http(requestParams({
              method: 'GET',
              cache: true,
              url: baseUrl + '/account_type'
          }));
        },
        createAccount: function(data) {
          var httpCache = $cacheFactory.get('$http');
          httpCache.removeAll();

          return $http(requestParams({
              method: 'POST',
              cache: true,
              url: baseUrl + '/account_type',
              data: data
          }));
        },
        deleteAccount: function(id) {
          var httpCache = $cacheFactory.get('$http');
          httpCache.removeAll();

          return $http(requestParams({
              method: 'DELETE',
              cache: true,
              url: baseUrl + '/account_type/' + id
          }));
        }

      }

      return {
        users: users,
        accounts: accounts
      }

    }

})();
