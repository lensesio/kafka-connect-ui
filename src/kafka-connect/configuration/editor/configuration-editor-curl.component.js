(function() {
  'use strict';

  /**
   * Renders configuration cURL command
   * @param {String} [connectorName] Connector name; denotes edit mode
   * @requires ngModel
   */
  angularAPP.component('configurationEditorCurl', {
    bindings: {
      connectorName: '<?',
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
   * @requires KafkaConnectFactory
   * @requires uiAceOptionsFactoryService
   */
  function ConfigurationEditorCurlController(env, KafkaConnectFactory, uiAceOptionsFactoryService) {
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
      self.ngModelController.$render = function () {
        var isCreating = !self.connectorName;
        var requestBody = self.ngModelController.$modelValue;

        if (!requestBody) {
          return;
        }

        if (isCreating) {
          requestBody = KafkaConnectFactory.transformNewConnectorRequestFromConfig(requestBody);
        }

        self.model = [
          'curl -X ' + (isCreating ? 'POST' : 'PUT'),
          env.KAFKA_CONNECT() + '/connectors' + (isCreating ? '' : '/' + self.connectorName + '/config'),
          "-H 'Content-Type: application/json'",
          "-H 'Accept: application/json'",
          "-d '" + angular.toJson(requestBody, true) + "'",
        ].join(' \\\n  ');
      };
    }
  }

})();
