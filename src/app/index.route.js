(function() {
  'use strict';

  angular
    .module('kitcheck')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('users', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'vm'
      })
      .state('user-details', {
        url: '/users/{userId}',
        templateUrl: 'app/users/user-details.html',
        controller: 'UserController',
        controllerAs: 'vm'
      })
      .state('new-user', {
        url: '/add-user',
        templateUrl: 'app/users/add-user.html',
        controller: 'MainController',
        controllerAs: 'vm'
      })
      .state('accounts', {
        url: '/accounts',
        templateUrl: 'app/account/account.html',
        controller: 'AccountController',
        controllerAs: 'vm'
      })
      .state('new-account', {
        url: '/add-account-type',
        templateUrl: 'app/account/add-account.html',
        controller: 'AccountController',
        controllerAs: 'vm'
      })
      .state('account-details', {
        url: '/account/{accountId}',
        templateUrl: 'app/account/account-details.html',
        controller: 'AccountController',
        controllerAs: 'vm'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
