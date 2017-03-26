(function() {
  'use strict';

  angular
    .module('kitcheck.core')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log, Angularytics) {

    $log.debug('runBlock end');

    Angularytics.init();

  }

})();
