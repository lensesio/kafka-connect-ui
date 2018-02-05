(function() {
  'use strict';

  /**
   * Extracts the type from the connector configuration
   * @requires supportedConnectorsFactory
   */
  angularAPP.filter('configurationType', function (supportedConnectorsFactory) {

    /**
     * @param {Object} config Connector configuration
     * @returns {String} Connector type (`Source` or `Sink`)
     */
    return function (config) {
      var configClass = config['connector.class'];
      var configClassParts;
      var connector = supportedConnectorsFactory.getSupportedConnectorObj(configClass);

      if (connector.type) {
        return connector.type;
      }

      configClassParts = configClass.split('.');

      return -1 !== configClassParts[configClassParts.length - 1].toLowerCase().indexOf('source') ? 'Source' : 'Sink';
    };
  });

})();
