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
    template: '<div ng-change="$ctrl.onModelChange()" ng-model="$ctrl.model" ng-readonly="$ctrl.ngReadonly" ui-ace="$ctrl.uiAceOptions"></div>',
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
      self.ngModelController.$render = function() {
        self.model = angular.toJson(self.ngModelController.$modelValue, true);
      };
    }

    /**
     * Handler called when JSON model changes
     */
    function onModelChange() {
      try {
        self.ngModelController.$setViewValue(angular.fromJson(self.model));
      } catch (e) {
        // do nothing
      }
    }
  }

})();
