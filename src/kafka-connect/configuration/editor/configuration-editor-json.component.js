(function() {
  'use strict';

  /**
   * JSON-based configuration editor
   * @param {Boolean} [ngReadonly]
   * @requires ngModel
   */
  angularAPP.component('configurationEditorJson', {
    bindings: {
      ngReadonly: '<?',
    },
    controller: ConfigurationEditorJsonController,
    require: {
      ngModelController: 'ngModel',
    },
    template: '<div ng-change="$ctrl.onModelChange()" ng-model="$ctrl.ngModelController.$viewValue" ng-readonly="$ctrl.ngReadonly" ui-ace="$ctrl.uiAceOptions"></div>',
  });

  /**
   * Controller for `configurationEditorJson` component
   * @requires uiAceOptionsFactoryService
   */
  function ConfigurationEditorJsonController(uiAceOptionsFactoryService) {
    var self = this;

    // Properties
    self.uiAceOptions = uiAceOptionsFactoryService.getOptions();

    // Methods
    self.$onInit = $onInit;
    self.onModelChange = onModelChange;

    /**
     * Initializes the configuration editor JSON component
     */
    function $onInit() {
      self.ngModelController.$formatters.push(function (value) {
        if (value) {
          return angular.toJson(value, true);
        }
      });

      self.ngModelController.$parsers.push(function (value) {
        try {
          return angular.fromJson(value);
        } catch (e) {
          return undefined;
        }
      });
    }

    /**
     * Handler called when JSON model changes
     */
    function onModelChange() {
      self.ngModelController.$setViewValue(self.ngModelController.$viewValue);
    }
  }

})();
