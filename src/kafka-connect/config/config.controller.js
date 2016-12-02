angularAPP.controller('KafkaConnectConfigCtrl', function ($scope, $http, $log, env, constants) {
  $scope.$on('$routeChangeSuccess', function() {
     $scope.showVersion = false;
     $scope.kafkaConnectURL = env.KAFKA_CONNECT();
         $http.get(env.KAFKA_CONNECT()).then(function(response){
            $scope.showVersion = true;
            $scope.version =response.data.version;
        })
  })
  $scope.connectivityError = constants.CONFIG_CONNECTIVITY_ERROR;
});
