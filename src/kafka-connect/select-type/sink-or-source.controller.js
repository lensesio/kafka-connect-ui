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
        var splitClass = plugin.class.split('.');
        var calcName = splitClass[splitClass.length - 1];

         var o = {
            name: calcName,
            class: plugin.class,
            icon: "connector.jpg",
            isUndefined: true,
            
        }
        if(!plugin.type) {
          o.type = calcName.toLowerCase().indexOf('sink') > 0 ? 'Sink' : 'Source'
        } else {
          o.type = plugin.type.toLowerCase() === 'sink' ? 'Sink' : 'Source'
        }
        if (o.type == "Source")
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
