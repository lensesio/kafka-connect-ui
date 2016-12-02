angularAPP.controller('SelectNewConnectorCtrl', function ($scope, $http, $log, $rootScope, KafkaConnectFactory, supportedConnectorsFactory, env  ) {
  $log.info("SelectNewConnector controller");

  $scope.cluster = env.getSelectedCluster().NAME;

  var supportedConnectors = supportedConnectorsFactory.getSupportedConnectors();
  if (supportedConnectors.length != 0) {
    $scope.sources = supportedConnectors.filter(supportedConnectorsFactory.matchesType('Source'));
    $scope.sinks = supportedConnectors.filter(supportedConnectorsFactory.matchesType('Sink'));
  }

  $scope.classesInClasspath = [];
  $scope.unsupportedConnectors = [];
  $scope.hasUnsupportedConnectors = false;


  KafkaConnectFactory.getConnectorPlugins(true).then(function (allPlugins) {
    angular.forEach(allPlugins, function (plugin) {
      $scope.classesInClasspath.push(plugin.class);
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
        $scope.unsupportedConnectors.push(o);
      }
    });
  }, function (reason) {
    $log.error('Failed: ' + reason);
  }, function (update) {
    $log.info('Got notification: ' + update);
  });
});