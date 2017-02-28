angularAPP.controller('HomeCtrl', function ($scope, $log, $location, $http, $interval, env, constants, connectorObjects, $rootScope) {

    var envs = env.getClusters();
    $rootScope.isHome = true;

    $scope.loadData = function () {

       $scope.stopRefresh = false;

       $scope.envs = [];
       $scope.totalConnectors = 0;
       $scope.failedClusters = 0;

       angular.forEach(envs, function(env) {

            var e = {
                name : "", connect : "", version: "", status : "", connectors : ""
            }

            e.name = env.NAME;
            e.connect = env.KAFKA_CONNECT;

            $http.get(env.KAFKA_CONNECT).then(function (response) {
                e.version = response.data.version;
                e.status = response.status;
                $http.get(env.KAFKA_CONNECT + "/connectors").then(function(response) {
                    e.connectors = response.data.length;
                    $scope.totalConnectors += e.connectors;
                })
            }).catch(function (response) {
                // Handle error here
                 e.status = response.status;
                 e.version = "N/A"
                 e.status = "N/A"
                 e.connectors = "N/A"

                 $scope.failedClusters += 1;
            });

            $scope.envs.push(e);

       })

   }

   //On load

   if(envs.length > 1) {
      $scope.loadData();
   } else {
      $location.path("/cluster/"+envs[0].NAME);
   }

   $interval(refresh, 2000);

   function refresh() {
    if(!$scope.stopRefresh) $scope.loadData();
   }

   //Go to cluster

   $scope.updateEndPoint = function(cluster, status) {
    if (status >= 200 && status < 400) {
        $rootScope.connectionFailure = false;
        $scope.stopRefresh = true;
        $location.path("/cluster/"+cluster);
    }
   }
});
