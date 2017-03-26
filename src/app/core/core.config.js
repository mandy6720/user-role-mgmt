(function() {
  'use strict';

  angular
    .module('kitcheck.core')
    .config(config);

  /** @ngInject */
  function config($logProvider, AngularyticsProvider) {
    // Enable log
    $logProvider.debugEnabled(true);

    // Enable Google Analytics Tracking for SPA
    AngularyticsProvider.setEventHandlers(['Console', 'GoogleUniversal']);
  }

})();
