(function() {
  'use strict';

  var PROPERTY_DELIMITER = '=';

  /**
   * Properties-based configuration editor
   * @param {String} [name] Connector name; denotes edit mode
   * @param {Boolean} [ngReadonly]
   * @requires ngModel
   */
  angularAPP.component('configurationEditorProperties', {
    bindings: {
      ngReadonly: '<?',
    },
    controller: ConfigurationEditorPropertiesController,
    require: {
      ngModelController: 'ngModel',
    },
    template: '<div ng-change="$ctrl.onModelChange()" ng-model="$ctrl.ngModelController.$viewValue" ng-readonly="$ctrl.ngReadonly" ui-ace="$ctrl.uiAceOptions"></div>',
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
      self.ngModelController.$formatters.push(function (model) {
        var properties;
        
        if (angular.isUndefined(model)) {
          return;
        }

        properties = [];

        for (var key in model) {
          properties.push(key + PROPERTY_DELIMITER + model[key]);
        }

        return properties.join('\n');
      });

      self.ngModelController.$parsers.push(function (value) {
        var config = {};
        var delimiterIndex;
        var line;
        var lines = value.match(/[^\r\n]+/g);

        var lines_len = lines.length;
        for (var i = 0; i < lines_len; i++) {
          line = lines[i].trim();

          if (!line || '#' === line.charAt(0)) {
            continue;
          }

          delimiterIndex = line.indexOf(PROPERTY_DELIMITER);

          if (-1 === delimiterIndex) {
            return; // parse error
          }

          config[line.substr(0, delimiterIndex)] = line.substr(1 + delimiterIndex);
        }

        return config;
      });
    }

    /**
     * Handler called when properties model changes
     */
    function onModelChange() {
      self.ngModelController.$setViewValue(self.ngModelController.$viewValue);
    }
  }

})();
