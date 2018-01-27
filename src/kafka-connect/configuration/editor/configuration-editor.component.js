(function() {
  'use strict';

  /**
   * Configuration editor
   * @param {String} [name] Connector name; denotes edit mode
   * @param {Boolean} [ngReadonly]
   * @requires ngModel
   */
  angularAPP.component('configurationEditor', {
    bindings: {
      name: '<?',
      ngReadonly: '<?',
    },
    controller: ConfigurationEditorController,
    require: {
      ngModelController: 'ngModel',
    },
    templateUrl: 'src/kafka-connect/configuration/editor/configuration-editor.html',
  });

  /**
   * Controller for `configurationEditor` component
   */
  function ConfigurationEditorController() {
    var self = this;

    // Methods
    self.$onChanges = $onChanges;
    self.$onInit = $onInit;
    self.onModelChange = onModelChange;

    /**
     * Life-cycle handler called when one-way bindings change
     * @param {Object} changes
     */
    function $onChanges(changes) {
      if (angular.isObject(changes.name)) {
        renderModel(angular.copy(self.ngModelController.$modelValue)); // ensure model re-renders
      }
    }

    /**
     * Initializes the configuration editor component
     */
    function $onInit() {
      self.ngModelController.$render = renderModel;
    }

    /**
     * Handler called when model changes
     */
    function onModelChange(model) {
      self.ngModelController.$setViewValue(self.model);
    }

    /**
     * Renders the form model
     * @param {Object} [model]
     */
    function renderModel(model) {
      if (angular.isUndefined(model)) {
        model = self.ngModelController.$modelValue;
      }

      if (self.name) {
        delete model.name;
      }

      self.model = model;
    }
  }

})();
