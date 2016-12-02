angularAPP.controller('KafkaConnectListCtrl', function ($scope, $rootScope, KafkaConnectFactory, $routeParams, $templateCache, $log, connectorObjects, constants, env) {

   $scope.noConnectorsFoundMessage = constants.LIST_NO_CONNECTORS_FOUND;
   $scope.rebalancingMesasge = constants.MESSAGE_REBALANCING;
  /**
   * Watch the 'newConnectorCreated' and update the connect-cache accordingly
   * TODO: Use it
   */
  $scope.$watch(function () {
    return $rootScope.newConnectorChanges;
  }, function (a) {
    if ($rootScope.newConnectorChanges) {
        initConnectors();
   }
  }, true);

  $scope.$on('$routeChangeSuccess', function() {
       $scope.cluster = env.getSelectedCluster().NAME;//$routeParams.cluster;
      initConnectors();
  })


   $scope.getTaskStates = function(connector) {
    return connector.tasks.map(function(task){ return task.state; }).indexOf('FAILED') !== -1;
    $rootScope.rebalancing = true;
   }

   function initConnectors(){
    connectorObjects.getConnectorList().then(function (allConnectors) {
        $scope.allConnectors = allConnectors;
        $rootScope.loading = false;
        $rootScope.rebalancing = false;
        $rootScope.newConnectorChanges = false;
      });
   }

});