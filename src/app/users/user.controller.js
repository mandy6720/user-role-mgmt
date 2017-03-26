(function() {
  'use strict';

  angular
    .module('kitcheck')
    .controller('UserController', UserController);

  /** @ngInject */
  function UserController($rootScope, $state, $stateParams, $uibModal, $log, userService) {
    var vm = this;
    vm.openModal = openModal;
    vm.toggleEditAccounts = toggleEditAccounts;
    vm.updateUser = updateUser;

    activate();

    function activate() {
      if ($state.$current.name == 'user-details') {
        getUserInfo($stateParams.userId);
        getAccountTypes();
      }
    }

    function getUserInfo(id) {
      userService.users.getUserById(id).then(function(res) {
        vm.user = res.data;
      });
    }

    function getAccountTypes() {
      userService.accounts.getAllAccountTypes().then(function(res) {
        vm.account_types = res.data;
      });
    }

    function openModal(size, user) {
      var modalInstance = $uibModal.open({
        templateUrl: 'app/modals/delete.modal.html',
        controller: 'ModalInstanceController',
        controllerAs: 'vm',
        size: size,
        resolve: {
          user: function () {
            return user;
          }
        }
      });
      modalInstance.result.then(function (selectedItem) {
        userService.users.deleteUser(selectedItem.id).then(function(){
          $state.go('users');
        });
      }, function () {
        $log.log('Modal dismissed at: ' + new Date());
      });
    }

    function toggleEditAccounts(user) {
      if (user.account_types.length) {
        user.account_types.forEach(function(item) {
          vm.account_types.forEach(function(value) {
            if (item.id == value.id) {
              value.selected = true;
            }
          });
        });
      }
      vm.editAccounts = true;
    }

    function updateUser(user) {
      var data = {
        first_name: user.first_name,
        last_name: user.last_name,
        account_type_ids: []
      };
      vm.account_types.forEach(function(item) {
        if (item.selected) {
          data.account_type_ids.push(item.id);
        }
      });
      userService.users.updateUser(user.id, angular.toJson(data)).then(function() {
        getUserInfo($stateParams.userId);
        vm.editAccounts = false;
      });
    }

  }
})();
