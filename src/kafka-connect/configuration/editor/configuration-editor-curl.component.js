(function() {
  'use strict';

  /**
   * Renders configuration cURL command
   * @param {String} [name] Connector name; denotes edit mode
   * @requires ngModel
   */
  angularAPP.component('configurationEditorCurl', {
    bindings: {
      name: '<?',
    },
    controller: ConfigurationEditorCurlController,
    require: {
      ngModelController: 'ngModel',
    },
    template: '<div ng-model="$ctrl.model" ng-readonly="true" ui-ace="$ctrl.uiAceOptions"></div>',
  });

  /**
   * Controller for `configurationEditorCurl` component
   * @requires env
   * @requires uiAceOptionsFactoryService
   */
  function ConfigurationEditorCurlController(env, uiAceOptionsFactoryService) {
    var self = this;

    // Properties
    self.uiAceOptions = uiAceOptionsFactoryService.getOptions({
      highlightGutterLine: false,
      mode: 'batchfile',
      showGutter: false,
      theme: 'chrome',
    });

    // Methods
    self.$onInit = $onInit;

    /**
     * Initializes the configuration cURL component
     */
    function $onInit() {
      self.ngModelController.$render = function() {
        self.model = [
          'curl -X ' + (self.name ? 'PUT' : 'POST'),
          env.KAFKA_CONNECT() + '/connectors' + (self.name ? '/' + self.name + '/config' : ''),
          "-H 'Content-Type: application/json'",
          "-H 'Accept: application/json'",
          "-d '" + angular.toJson(self.ngModelController.$modelValue, true) + "'",
        ].join(' \\\n  ');
      };
    }
  }

})();
