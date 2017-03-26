(function() {
  'use strict';

  angular
    .module('kitcheck')
    .controller('AccountController', AccountController);

  /** @ngInject */
  function AccountController($rootScope, $state, $stateParams, $uibModal, userService) {
    var vm = this;
    vm.editAccountUsers = false;
    vm.createAccount = createAccount;
    vm.openModal = openModal;
    vm.toggleEditUsers = toggleEditUsers;
    vm.saveUsers = saveUsers;

    activate();

    function activate() {
      getAllUsers();
    }

    function getAllUsers() {
      userService.users.getAllUsers().then(function(res) {
        vm.users = res.data;
        getAllAccountTypes(res.data);
      });
    }

    function getAllAccountTypes(userData) {
      userService.accounts.getAllAccountTypes().then(function(res) {
        res.data.forEach(function(item) {
          item.collapsed = true;
        });
        vm.accountTypes = res.data;
        if (vm.users && vm.users.length) {
          makeChart(vm.accountTypes, userData);
        } 
      });
    }

    function createAccount(name) {
      var data = {name: name};
      userService.accounts.createAccount(angular.toJson(data)).then(function() {
        $state.go('accounts');
      });
    }

    function makeChart(accountData, userData) {
      vm.accountLabels = [];
      vm.accountData = [];
      vm.accountUsers = [];
      userData.forEach(function(user) {
        if (user.account_types.length) {
          user.account_types.forEach(function(type) {
            if (vm.accountLabels.indexOf(type.name) === -1) {
              vm.accountLabels.push(type.name);
              vm.accountData.push(1);
              vm.accountUsers.push([user]);
            } else {
              vm.accountData[vm.accountLabels.indexOf(type.name)]++;
              vm.accountUsers[vm.accountLabels.indexOf(type.name)].push(user);
            }
          });
        }
      });
      vm.showChart = true;
      makeUserList(vm.accountTypes);
    }

    function makeUserList(accountTypes) {
      accountTypes.forEach(function(type) {
        if (vm.accountLabels.indexOf(type.name) !== -1) {
          type.users = vm.accountUsers[vm.accountLabels.indexOf(type.name)];
        } else {
          type.users = [];
        }
      });
      if ($state.$current.name == 'account-details') {
        setSelectedType();
      }
    }

    function setSelectedType() {
      vm.selectedAccount = vm.accountTypes.filter(function(item) {
        return item.id == $stateParams.accountId;
      })[0];
    }

    function toggleEditUsers() {
      if (vm.selectedAccount.users.length) {
        vm.users.forEach(function(user) {
          vm.selectedAccount.users.forEach(function(item) {
            if (item.id == user.id) {
              user.selected = true;
            }
          });
        });
      }
      vm.editAccountUsers = true;
    }

    function saveUsers() {
      vm.users.forEach(function(user) {
        var data;
        var typesArr = [];
        user.account_types.forEach(function(type) {
          typesArr.push(type.id)
        });
        if (user.selected && typesArr.indexOf(Number($stateParams.accountId)) == -1) {
          typesArr.push(Number($stateParams.accountId));
          user.account_types.push(Number($stateParams.accountId));
          // update user
          data = {
            first_name: user.first_name,
            last_name: user.last_name,
            account_type_ids: typesArr
          };
          userService.users.updateUser(user.id, angular.toJson(data)).then(function() {
            getAllUsers();
            vm.editAccountUsers = false;
          });
        } else if (!user.selected && typesArr.indexOf(Number($stateParams.accountId)) > -1) {
          // expect to not have $stateParams.accountId in list
          typesArr.splice(typesArr.indexOf(Number($stateParams.accountId), 1));
          data = {
            first_name: user.first_name,
            last_name: user.last_name,
            account_type_ids: typesArr
          };
          userService.users.updateUser(user.id, angular.toJson(data)).then(function() {
            getAllUsers();
            vm.editAccountUsers = false;
          });
        }
      });
    }

    function openModal(size, user) {
      var modalInstance = $uibModal.open({
        templateUrl: 'app/modals/delete.account.modal.html',
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
        userService.accounts.deleteAccount(selectedItem.id).then(function(){
          $state.go('accounts');
        });
      });
    }

  }
})();
