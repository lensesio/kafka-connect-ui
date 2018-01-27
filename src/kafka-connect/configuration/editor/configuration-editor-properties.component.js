(function() {
  'use strict';

  var PROPERTY_DELIMITER = '=';
  var PROPERTY_NAME = 'name';

  /**
   * Properties-based configuration editor
   * @param {String} [name] Connector name; denotes edit mode
   * @param {Boolean} [ngReadonly]
   * @requires ngModel
   */
  angularAPP.component('configurationEditorProperties', {
    bindings: {
      name: '<?',
      ngReadonly: '<?',
    },
    controller: ConfigurationEditorPropertiesController,
    require: {
      ngModelController: 'ngModel',
    },
    template: '<div ng-change="$ctrl.onModelChange()" ng-model="$ctrl.model" ng-readonly="$ctrl.ngReadonly" ui-ace="$ctrl.uiAceOptions"></div>',
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
        var config;
        var properties;
        
        if (angular.isUndefined(model)) {
          return;
        }

        config = self.name ? model : model.config;
        properties = [];

        if (!self.name) { // include name on creation
          properties.push(PROPERTY_NAME + PROPERTY_DELIMITER + model[PROPERTY_NAME]);
        }

        for (var key in config) {
          properties.push(key + PROPERTY_DELIMITER + config[key]);
        }

        self.model = properties.join('\n');
      };
    }

    /**
     * Handler called when properties model changes
     */
    function onModelChange() {
      var config = {};
      var name;

      self.model.match(/[^\r\n]+/g).forEach(function(line) {
        line = line.trim();

        if ('#' === line.charAt(0)) {
          return;
        }

        line = line.split(PROPERTY_DELIMITER);

        if (PROPERTY_NAME === line[0]) {
          name = line[1] || '';
        } else {
          config[line[0]] = line[1] || '';
        }
      });

      self.ngModelController.$setViewValue(self.name ? config : {
        name: name,
        config: config,
      });
    }
  }

})();
