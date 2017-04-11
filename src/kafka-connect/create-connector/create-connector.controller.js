/*
    $scope.connector in this controller is the connector object from supported connectors.
    Config is created on the fly using the `template` models.
 */
angularAPP.controller('CreateConnectorCtrl', function ($scope, $rootScope, $http, $log, $routeParams, $location, $filter, KafkaConnectFactory, supportedConnectorsFactory,  NewConnectorFactory, env, constants, $q) {
  KafkaConnectFactory.getConnectorPlugins().then(function(allPlugins) {
    var className;

    for (var i in allPlugins) {
      className = allPlugins[i].class;

      if (className === $routeParams.className) {
        getClassConfig(className)
        break;
      }
    }
  }, function (reason) {
    $log.error('Failed: ' + reason);
  }, function (update) {
    $log.info('Got notification: ' + update);
  });

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
      console.log('test', $scope.formValuesPerSection)
      $scope.formValuesPerSection = $scope.formValuesPerSection.replace("\r", "");
      console.log('test', $scope.formValuesPerSection)
      var flatValuesArray = $scope.formValuesPerSection.split("\n");
      $scope.curlCommand = NewConnectorFactory.getCurlCommand(flatValuesArray);
  }
  });


    function validateConnectorFn () {
            var deferred = $q.defer();
            var connectorCurlObject = {
              name: "",
              config: {}
            };

            flatValuesArray = $scope.formValuesPerSection.split('\n');
            config = NewConnectorFactory.getJSONConfigFlat(flatValuesArray);
            var classname = $scope.connector.class;

            //STEP 1: Validate
            var validateConfigPromise = KafkaConnectFactory.validateConnectorConfig(classname, config);
            validateConfigPromise.then(
                function success(data) {
                  $log.info('Total validation errors from API => ' + data.error_count);
                  //STEP 2: Get errors if any
                  $scope.validConfig = '';
                  var errorConfigs = [];
                  var validConnectorConfigKeys = [];
                  angular.forEach(data.configs, function (config) {
                    if (config.value.errors.length > 0) {
                        errorConfigs.push(config.value);
                        $log.info(config.value.name + ' : ' + config.value.errors[0]);
                    }
                    validConnectorConfigKeys.push(config.value.name);
                  });
                  angular.forEach(flatValuesArray, function (propertyLine) {
                    if (propertyLine.length > 0) {
                      if ( (propertyLine.indexOf("=") == -1) | (propertyLine.length < 3) ) {                        var errors = { errors : [ 'Line "' + propertyLine + '" is not a valid property line' ] };
                        errorConfigs.push(errors);
                      } else {
                          var key = propertyLine.substring(0, propertyLine.indexOf('='));
                          var value = propertyLine.substring(propertyLine.indexOf('=') + 1);
                          if (validConnectorConfigKeys.indexOf( key.toLowerCase() ) == -1) {
                            var errors = { errors : [ 'Config "' + key + '" is not supported' ] };
                            errorConfigs.push(errors);
                          } else
                          if (value.length == 0) {
                            var errors = { errors : [ 'Config "' + key + '" requires a value' ] };
                            errorConfigs.push(errors);
                          } else {
                            connectorCurlObject.config["" + key] = value;
                          }
                      }
                    }
                  });
                  if(errorConfigs == 0) {
                      $scope.validConfig = constants.VIEW_MESSAGE_CONNECTOR_VALID;
                      deferred.resolve(constants.VIEW_MESSAGE_CONNECTOR_VALID);
                  } else {
                      deferred.reject(errorConfigs);
                  }
                  $scope.errorConfigs = errorConfigs;

                  /* debug
                  var flatKeysUsed = [];
                  angular.forEach(flatValuesArray, function (propertyLine) {
                      flatKeysUsed.push(propertyLine.split("=" , 1) + "");
                  });
                  console.log(validConnectorConfigKeys);
                  console.log(flatKeysUsed);
                  console.log(errorConfigs);
                  */
                }, function (data, reason) {
                  $log.error('Failure : ' + data);
                  deferred.reject(data);

                });
                return deferred.promise;

    }

  $scope.validateConnector = function () {
    validateConnectorFn();
  }


  $scope.validateAndCreateConnector = function () {

          validateConnectorFn().then(
            function success(data) {
              console.log("I will now post the connector");
              KafkaConnectFactory.postNewConnector(NewConnectorFactory.getJSONConfig(flatValuesArray)).then(
                function successCallback(response) {
                   console.log("POSTING " + JSON.stringify(response));
                   $location.path("#/connector/" + response.name); //TODO location doesn't work, move to controller
                   $rootScope.newConnectorChanges = true;
                });
            }, function (data, reason) {
              console.log("I can NOT post the connector - as validation errors exist");
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
       data: '{ "connector.class" : "' + pluginClass + '" }',
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
         data: '{ "connector.class" : "' + pluginClass + '" }',
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