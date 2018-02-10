(function() {
  'use strict';

  /**
   * Configuration classname validation directive
   * @requires ngModel
   */
  angularAPP.directive('validateConfigurationClassname', function () {
    return {
      bindToController: true,
      controller: ValidateConfigurationClassnameDirectiveController,
      require: {
        ngModelController: 'ngModel',
      },
      restrict: 'A',
    };
  });

  /**
   * Controller for `validateConfigurationClassname` component
   * @requires $attrs
   * @requires $parse
   * @requires $scope
   */
  function ValidateConfigurationClassnameDirectiveController($attrs, $parse, $scope) {
    var self = this;

    // Methods
    self.$onInit = $onInit;

    /**
     * Initializes the configuration classname validation directive
     */
    function $onInit() {
      var classname;

      $scope.$watch($attrs.validateConfigurationClassname, function (clazz) {
        classname = clazz;
      });

      self.ngModelController.$validators.classname = function (model) {
        return angular.isUndefined(model) ||
          (classname && angular.isObject(model) && classname === model['connector.class']);
      };
    }
  }

})();
