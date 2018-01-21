(function() {
  'use strict';

  /**
   * Configuration editor
   * @requires ngModel
   */
  angularAPP.component('configurationEditor', {
    controller: ConfigurationEditorController,
    require: {
      ngModelController: 'ngModel',
    },
    templateUrl: 'src/kafka-connect/configuration/editor/configuration-editor.html',
  });

  /**
   * Controller for `configurationEditor` component
   * @requires uiAceOptionsFactoryService
   */
  function ConfigurationEditorController(uiAceOptionsFactoryService) {
    var self = this;

    // Properties
    self.uiAceJsonOptions = uiAceOptionsFactoryService.getOptions();

    // Methods
    self.$onInit = $onInit;
    self.onGetSetJson = onGetSetJson;
    self.onModelChange = onModelChange;

    /**
     * Initializes the configuration editor component
     */
    function $onInit() {
      self.ngModelController.$render = function() {
        self.model = self.ngModelController.$modelValue;
      }
    }

    /**
     * Handler called when JSON configuration model is retrieved or set
     * @param {String} [model] JSON string on set; otherwise undefined
     * @returns {String|Object}
     */
    function onGetSetJson(model) {
      return angular.isDefined(model) ? (self.model = angular.fromJson(model)) : angular.toJson(self.model, true);
    }

    /**
     * Handler called when model changes
     */
    function onModelChange(model) {
      self.ngModelController.$setViewValue(self.model);
    }
  }

})();
