(function() {
  'use strict';

  angular
    .module('kitcheck')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($rootScope, $state, userService) {
    var vm = this;
    vm.addUser = addUser;

    activate();

    function activate() {
      getUsers();
      getAccountTypes();
    }

    function getUsers() {
      userService.users.getAllUsers().then(function(res) {
        res.data.forEach(function(item) {
          item.collapsed = true;
        });
        vm.users = res.data;
      });
    }

    function getAccountTypes() {
      userService.accounts.getAllAccountTypes().then(function(res) {
        vm.account_types = res.data;
      });
    }

    function addUser() {
      var accountTypes = [];
      vm.account_types.forEach(function(item) {
        if (item.selected) {
          accountTypes.push(item.id);
        }
      });
      var data = {
        first_name: vm.newUser.first_name,
        last_name: vm.newUser.last_name,
        account_type_ids: accountTypes
      }
      userService.users.addUser(angular.toJson(data)).then(function() {
        $state.go('users');
      });
    }

  }
})();
