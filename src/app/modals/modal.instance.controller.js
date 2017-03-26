(function() {
  'use strict';

  angular
    .module('kitcheck')
    .controller('ModalInstanceController', ModalInstanceController);

  /** @ngInject */
  function ModalInstanceController($uibModalInstance, $state, userService, user) {
    var vm = this;
    vm.ok = ok;
    vm.close = close;
    vm.user = user;

    function ok() {
      $uibModalInstance.close(vm.user);
    }

    function close() {
      $uibModalInstance.dismiss('cancel');
    }

  }
})();
