angularAPP.controller('KafkaConnectConfigCtrl', function ($scope, $http, $log, env, constants) {
  $scope.$on('$routeChangeSuccess', function() {
     $scope.kafkaConnectURL = env.KAFKA_CONNECT();
  })
  $scope.connectivityError = constants.CONFIG_CONNECTIVITY_ERROR;
});
