(function() {
  'use strict';

  /**
   * Configuration validation messages component
   * @param {String} connectorClass Connector classname
   * @param {Object} form Configuration form
   * @param {String} modelName Name of configuration model
   */
  angularAPP.component('configurationValidationMessages', {
    bindings: {
      connectorClass: '<',
      form: '<',
      modelName: '@',
    },
    templateUrl: 'src/kafka-connect/configuration/validation/configuration-validation-messages.html',
  });

})();
