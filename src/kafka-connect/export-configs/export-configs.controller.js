angularAPP.controller('ExportConfigsCtrl', function ($scope, $rootScope, env, KafkaConnectFactory, NewConnectorFactory, $http, $routeParams, $templateCache, $log, connectorObjects, constants) {
    $scope.cluster = env.getSelectedCluster().NAME;
    $rootScope.rebalancing = true;
    $scope.properties = [];
    $scope.jsons = ''
    $scope.curls = [];
    $http.get(env.KAFKA_CONNECT() + '/connectors').then(function(response){
        angular.forEach(response.data, function(con){
           $http.get(env.KAFKA_CONNECT() + '/connectors/' + con).then(function(response){
//                $scope.allConnectors.push(angular.toJson(response.data.config, true));

                //properties modes
                var a = configToProperties(response.data.config)
                $scope.properties.push('# '+ response.data.name + '\n\n'+a.join("\n"));
//                $scope.propertiesStr = $scope.propertiesStr + '# '+ response.data.name + '\n\n'+a.join("\n");


                //curl modes
                $scope.curls.push(NewConnectorFactory.getCurlCommand(configToProperties(response.data.config)));

                //edit modes
                $scope.jsons = $scope.jsons +
                                            '/*** ' + response.data.name + ' ***/ \n\n' +
                                            angular.toJson(response.data.config, true) + '\n\n';


                var propertiesBlob = new Blob([ $scope.propertiesStr ], { type : 'text/plain' });
                $scope.propertiesURL = (window.URL || window.webkitURL).createObjectURL( propertiesBlob );

                var jsonsBlob = new Blob([ $scope.jsons ], { type : 'text/plain' });
                $scope.jsonsURL = (window.URL || window.webkitURL).createObjectURL( jsonsBlob );

                var curlsBlob = new Blob([ $scope.curlsStr ], { type : 'text/plain' });
                $scope.curlsURL = (window.URL || window.webkitURL).createObjectURL( curlsBlob );
           })
        });

    })




    function configToProperties(config) {
        var conProps = [];
        angular.forEach(config, function(k,v) {
         conProps.push((v +"="+k));
        });
        return conProps;
    }

});


