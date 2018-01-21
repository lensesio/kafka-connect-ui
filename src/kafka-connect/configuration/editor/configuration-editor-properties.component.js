(function() {
  'use strict';

  var PROPERTY_DELIMITER = '=';
  var PROPERTY_NAME = 'name';

  /**
   * Properties-based configuration editor
   * @requires ngModel
   */
  angularAPP.component('configurationEditorProperties', {
    controller: ConfigurationEditorPropertiesController,
    require: {
      ngModelController: 'ngModel',
    },
    templateUrl: 'src/kafka-connect/configuration/editor/configuration-editor-properties.html',
  });

  /**
   * Controller for `configurationEditorProperties` component
   * @requires uiAceOptionsFactoryService
   */
  function ConfigurationEditorPropertiesController(uiAceOptionsFactoryService) {
    var self = this;

    // Properties
    self.uiAceOptions = uiAceOptionsFactoryService.getOptions({
      mode: 'properties',
    });

    // Methods
    self.$onInit = $onInit;
    self.onModelChange = onModelChange;

    /**
     * Initializes the configuration editor properties component
     */
    function $onInit() {
      self.ngModelController.$render = function() {
        var model = self.ngModelController.$modelValue;
        var properties;
        
        if (angular.isUndefined(model)) {
          return;
        }

        properties = [
          PROPERTY_NAME + PROPERTY_DELIMITER + model[PROPERTY_NAME],
        ];

        for (var key in model.config) {
          properties.push(key + PROPERTY_DELIMITER + model.config[key]);
        }

        self.model = properties.join('\n');
      };
    }

    /**
     * Handler called when properties model changes
     */
    function onModelChange() {
      var result = {
        name: '',
        config: {},
      };

      self.model.match(/[^\r\n]+/g).forEach(function(line) {
        line = line.trim();

        if ('#' === line.charAt(0)) {
          return;
        }

        line = line.split(PROPERTY_DELIMITER);

        if (PROPERTY_NAME === line[0]) {
          result[PROPERTY_NAME] = line[1] || '';
        } else {
          result.config[line[0]] = line[1] || '';
        }
      });

      self.ngModelController.$setViewValue(result);
    }
  }

})();
