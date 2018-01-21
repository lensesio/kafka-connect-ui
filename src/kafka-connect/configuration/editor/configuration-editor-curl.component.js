(function() {
  'use strict';

  /**
   * Renders configuration cURL command
   * @requires ngModel
   */
  angularAPP.component('configurationEditorCurl', {
    controller: ConfigurationEditorCurlController,
    require: {
      ngModelController: 'ngModel',
    },
    templateUrl: 'src/kafka-connect/configuration/editor/configuration-editor-curl.html',
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
          'curl -X POST',
          env.KAFKA_CONNECT() + '/connectors',
          "-H 'Content-Type: application/json'",
          "-H 'Accept: application/json'",
          "-d '" + angular.toJson(self.ngModelController.$modelValue, true) + "'",
        ].join(' \\\n  ');
      };
    }
  }

})();
