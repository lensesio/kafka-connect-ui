angularAPP.controller('SelectNewConnectorCtrl', function ($scope, $http, $log, $rootScope, KafkaConnectFactory, supportedConnectorsFactory, env) {
  $log.info("SelectNewConnector controller");

  var classpathMap = {};

  $scope.cluster = env.getSelectedCluster().NAME;

  var supportedConnectors = supportedConnectorsFactory.getSupportedConnectors();
  if (supportedConnectors.length != 0) {
    $scope.sources = supportedConnectors.filter(supportedConnectorsFactory.matchesType('Source'));
    $scope.sinks = supportedConnectors.filter(supportedConnectorsFactory.matchesType('Sink'));
  }

  $scope.unsupportedConnectors = [];
  $scope.hasUnsupportedConnectors = false;

  $scope.isClassInClasspath = isClassInClasspath;

  KafkaConnectFactory.getConnectorPlugins().then(function (allPlugins) {
    angular.forEach(allPlugins, function (plugin) {
      classpathMap[plugin.class] = true;

      if (supportedConnectorsFactory.getAllClassFromTemplate().indexOf(plugin.class) == -1) {
        $scope.hasUnsupportedConnectors = true;
          var type="Unknown";
          var a = plugin.class.split('.');
          if (a[a.length-1].toLowerCase().indexOf('sink') > 0) {
          type="Sink"
          } else if (a[a.length-1].toLowerCase().indexOf('source') > 0) {
          type="Source"
          }
         var o = {
            name: a[a.length-1],
            class: plugin.class,
            icon: "connector.jpg",
            isUndefined: true,
            type: type
        }
        if (type == "Source")
        $scope.sources.push(o);
        else
        $scope.sinks.push(o);
      }
    });
  }, function (reason) {
    $log.error('Failed: ' + reason);
  }, function (update) {
    $log.info('Got notification: ' + update);
  });

  /**
   * @description Determines if the specified class name is in the classpath
   * @param {String} className
   * @returns {Boolean}
   */
  function isClassInClasspath(className) {
    return angular.isDefined(classpathMap[className]);
  }
});
