/*
    $scope.connector in this controller is the connector object from supported connectors.
    Config is created on the fly using the `template` models.
 */
angularAPP.controller('CreateConnectorCtrl', function ($scope, $rootScope, $http, $log, $routeParams, $location, $filter, KafkaConnectFactory, supportedConnectorsFactory,  NewConnectorFactory, env, constants) {
  if (NewConnectorFactory.initConnector($routeParams.name)) {
    $scope.connector = NewConnectorFactory.initConnector($routeParams.name);
    $scope.maxNumberOfTabs = !$scope.connector.isUndefined  ? $scope.connector.template.length + 1 : 0;
    $scope.selectedTabIndex = !$scope.connector.isUndefined  ? $scope.connector.template.length + 1 : 0;
    $scope.makeCommands = function () {
      var configValues = NewConnectorFactory.flattenConnectorKeyValues($scope.connector);
      $scope.formValuesPerSection = configValues.join("\n");
      $scope.curlCommand = NewConnectorFactory.getCurlCommand(configValues);
    };
  } else {
      $http.get(env.KAFKA_CONNECT() + '/connector-plugins').then(function(allPlugins){
            angular.forEach(allPlugins.data, function (plugin) {
              if (plugin.class.indexOf($routeParams.name) > 0) {
               getClassConfig(plugin.class)
              }
            });
      },
      function (reason) {
         $log.error('Failed: ' + reason);
       }, function (update) {
         $log.info('Got notification: ' + update);
       });

  }
  $scope.prefillValues = true;
  $scope.showCurl = false;
  $scope.toggleShowCurl = function () { $scope.showCurl = !$scope.showCurl; }

  $scope.nextTab = function() { $scope.selectedTabIndex = ($scope.selectedTabIndex == $scope.maxNumberOfTabs) ? 0 : $scope.selectedTabIndex + 1; };
  $scope.previousTab = function() {
    $scope.selectedTabIndex = ($scope.selectedTabIndex == $scope.maxNumberOfTabs) ? 0 : $scope.selectedTabIndex - 1;
  }
  $scope.isDisabledTab = function(index) { return (index == $scope.selectedTabIndex) ? 'false' : 'true'; }



  //If user changes config from the editor
  $scope.$watch('formValuesPerSection', function() {
 if ($scope.formValuesPerSection) {
      var flatValuesArray = $scope.formValuesPerSection.split("\n");
      $scope.curlCommand = NewConnectorFactory.getCurlCommand(flatValuesArray);
  }
  });


  //TODO save & Validate = duplicate code

    $scope.validateConnector = function (object) {

            flatValuesArray = $scope.formValuesPerSection.split('\n');
            var connectorCurlObject = {
                       name: "",
                       config: {}
                  };
               angular.forEach(flatValuesArray, function (propertyLine) {
                 if (propertyLine.length > 2) {
                   var key = propertyLine.substring(0, propertyLine.indexOf('='));
                   var value = propertyLine.substring(propertyLine.indexOf('=') + 1);
                   connectorCurlObject.config["" + key] = value;
                 }
               });

            config = NewConnectorFactory.getJSONConfigFlat(flatValuesArray);
            var classname = $scope.connector.class;
            //STEP 1: Validate
            var validateConfigPromise = KafkaConnectFactory.validateConnectorConfig(classname, config);
            validateConfigPromise.then(
                function success(data) {
                  $log.info('Total validation errors => ' + data.error_count);
                  //STEP 2: Get errors if any
                  var errorConfigs = [];
                  $scope.validConfig = ''
                  angular.forEach(data.configs, function (config) {
                    if (config.value.errors.length > 0) {
                        errorConfigs.push(config.value);
                        $log.info(config.value.name + ' : ' + config.value.errors[0]);
                    }
                  });
                  if(errorConfigs == 0) {
                      $scope.validConfig = constants.VIEW_MESSAGE_CONNECTOR_VALID;
                  }

                  $scope.errorConfigs = errorConfigs;

                }, function (data, reason) {
                  $log.error('Failure : ' + data);
                });
    }


  $scope.validateAndCreateConnector = function () {
        flatValuesArray = $scope.formValuesPerSection.split('\n');
        var connectorCurlObject = {
                   name: "",
                   config: {}
              };
           angular.forEach(flatValuesArray, function (propertyLine) {
             if (propertyLine.length > 2) {
               var key = propertyLine.substring(0, propertyLine.indexOf('='));
               var value = propertyLine.substring(propertyLine.indexOf('=') + 1);
               connectorCurlObject.config["" + key] = value;
             }
           });

        config = NewConnectorFactory.getJSONConfigFlat(flatValuesArray);
        var classname = $scope.connector.class;

        //STEP 1: Validate
        var validateConfigPromise = KafkaConnectFactory.validateConnectorConfig(classname, config);


        validateConfigPromise.then(
            function success(data) {
              $log.info('Total validation errors => ' + data.error_count);

              //STEP 2: Get errors if any
              var errorConfigs = [];
              angular.forEach(data.configs, function (config) {
                if (config.value.errors.length > 0) {
                    errorConfigs.push(config.value);
                    $log.info(config.value.name + ' : ' + config.value.errors[0]);
                }
              });

              //STEP 3: If no errors, create the connector
              if(errorConfigs.length == 0) {
                var config2 = NewConnectorFactory.getJSONConfig(flatValuesArray);
                KafkaConnectFactory.postNewConnector(config2).then(
                   function successCallback(response) {
                       console.log("POSTING " + JSON.stringify(response));
                       $location.path("#/connector/" + response.name); //TODO location doesn't work, move to controller
                       $rootScope.newConnectorChanges = true;


                   });
              } else {
                $scope.errorConfigs = errorConfigs;
              }

            }, function (data, reason) {
              $log.error('Failure : ' + data);
            });
    }

  $scope.querySearch = function(query){
        return $http.get(env.KAFKA_REST() + '/topics')
        .then(function(response){
          return response.data.filter( function(topic) { return topic.indexOf(query) > -1 });
        })
      }; //for the autocomplete


  function getClassConfig (pluginClass){
    var type="Unknown";
    var a = pluginClass.split('.');
    if (a[a.length-1].toLowerCase().indexOf('sink') > 0) {
    type="Sink"
    } else if (a[a.length-1].toLowerCase().indexOf('source') > 0) {
    type="Source"
    }

     var connector = {
      name: a[a.length-1],
      class: pluginClass,
      icon: "connector.jpg",
      isUndefined: true,
      type: type,
      template : [
       {
         step : "Basic Info",
         id : "step1",
         sections : [
         {
          elements : [{key:'name',value: a[a.length-1], required: true}, {key:'connector.class', value: pluginClass, required: true},{key:'topics',value: 'TopicName_'+ a[a.length-1], required: true}, {key:'tasks.max',value: 1, required: true}]
          }
         ]
       }
      ]
     }

    var request = {
       method: 'PUT',
       url: env.KAFKA_CONNECT() + '/connector-plugins/' + pluginClass + '/config/validate',
       data: '{}',
       dataType: 'json',
       headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}
    };

    $http(request).then(function(data){
    angular.forEach(data.data.configs, function (config) {
      if (config.definition.name !== 'name' && config.definition.name !== 'connector.class' && config.definition.required == true) {
         connector.template[0].sections[0].elements.push({
           key: config.definition.name,
           value: config.definition.default_value ? config.definition.default_value : '',
           required: config.definition.required
         });
      }
    });
    function compare(a,b) {
      if (a.required < b.required)
        return 1;
      if (a.required > b.required)
        return -1;
      return 0;
    }
    connector.template[0].sections[0].elements.sort(compare);
    return connector;
    }).then(function(connector) {
       $scope.connector = angular.copy(connector);
       $scope.maxNumberOfTabs = 1
       $scope.selectedTabIndex = 1
       var configValues = NewConnectorFactory.flattenConnectorKeyValues($scope.connector);
       $scope.formValuesPerSection = configValues.join("\n");
       $scope.curlCommand = NewConnectorFactory.getCurlCommand(configValues);
    });
  }

$scope.getAllConfig = function (pluginClass){
  if ($scope.showAllConfig !== true) {
   var request = {
         method: 'PUT',
         url: env.KAFKA_CONNECT() + '/connector-plugins/' + pluginClass + '/config/validate',
         data: '{}',
         dataType: 'json',
         headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}
      };
      $scope.allValues =  {template : [{sections : [{elements : []}]}]};
      $http(request).then(function(data){
       angular.forEach(data.data.configs, function (config) {
         if ($scope.formValuesPerSection.indexOf(config.definition.name) < 0) {
            $scope.allValues.template[0].sections[0].elements.push({
              key: config.definition.name,
              value: config.definition.default_value ? config.definition.default_value : '',
              required: config.definition.required
            });
         }
      });
    }).then(function() {
    $scope.configAllValues = NewConnectorFactory.flattenConnectorKeyValues($scope.allValues);

    if ($scope.configAllValues.length > 0){
        $scope.formValuesPerSection = $scope.formValuesPerSection + '\n' +  $scope.configAllValues.join("\n");
        $scope.showAllConfig = true
        $scope.noextraconfig = false
        } else {
        $scope.noextraconfig = true
        }
     });
  } else {
    if ($scope.configAllValues.length > 0){
      $scope.formValuesPerSection = $scope.formValuesPerSection.replace('\n'+ $scope.configAllValues.join("\n"), '');
    }
    $scope.showAllConfig = false;
  }
}

});