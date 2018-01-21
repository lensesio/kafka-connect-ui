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
    self.$onInit = $onInit;
    self.onModelChange = onModelChange;

    /**
     * Initializes the configuration editor component
     */
    function $onInit() {
      self.ngModelController.$render = function() {
        self.model = self.ngModelController.$modelValue;

        if (self.name) {
          delete self.model.name;
        }
      }
    }

    /**
     * Handler called when model changes
     */
    function onModelChange(model) {
      self.ngModelController.$setViewValue(self.model);
    }
  }

})();
