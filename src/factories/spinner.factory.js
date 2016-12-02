/**
 * Utils angularJS Factory
 */
angularAPP.factory('Spinner', function ($log, $rootScope) {

  /* Public API */
  return {
    start: function () {
      $rootScope.showSpinner = true;
    },
    stop: function () {
      $rootScope.showSpinner = false;
    }

  }

});