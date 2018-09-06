/*
    $scope.connector in this controller is the connector object from supported connectors.
    Config is created on the fly using the `template` models.
 */
angularAPP.controller('CreateConnectorCtrl', function ($scope, $rootScope, $http, $log, $routeParams, $location, KafkaConnectFactory, NewConnectorFactory, env, constants, $q) {
  var optionalConfig;

  KafkaConnectFactory.getConnectorPlugins().then(function(allPlugins) {
    var className;

    for (var i in allPlugins) {
      className = allPlugins[i].class;

      if (className === $routeParams.className) {
        getClassConfig(className);
        break;
      }
    }
  }, function (reason) {
    $log.error('Failed: ' + reason);
  }, function (update) {
    $log.info('Got notification: ' + update);
  });

  $scope.prefillValues = true;

  $scope.nextTab = function() { $scope.selectedTabIndex = ($scope.selectedTabIndex == $scope.maxNumberOfTabs) ? 0 : $scope.selectedTabIndex + 1; };
  $scope.previousTab = function() {
    $scope.selectedTabIndex = ($scope.selectedTabIndex == $scope.maxNumberOfTabs) ? 0 : $scope.selectedTabIndex - 1;
  };
  $scope.isDisabledTab = function(index) { return (index == $scope.selectedTabIndex) ? 'false' : 'true'; };

  //If user changes config from the editor
  $scope.$watch('model', function(model) {
    if (model) {
      validateConnectorFn(model);
    }
  }, true);


    function validateConnectorFn(model) {
            var deferred = $q.defer();
            var errorConfigs = [];
            var warningConfigs = [];

            if (angular.isUndefined(model)) {
              model = $scope.model;
            }

            // Make sure the 'classname' is a valid one - as it can crash the connect services
            var classname = model['connector.class'];
            if (classname != $scope.connector.class) {
                console.log("error in classname -> " + classname);
                var errors = { errors : [ 'Classname "' + $scope.connector.class + '" is not defined' ] };
                errorConfigs.push(errors);

                if(errorConfigs == 0) {
                    $scope.validConfig = constants.VIEW_MESSAGE_CONNECTOR_VALID;
                }
                $scope.errorConfigs = errorConfigs;
            }

            //STEP 1: Validate
            $scope.validConfig = '';
            var validConnectorConfigKeys = [];
            var requiredConfigKeys = [];
            KafkaConnectFactory.validateConnectorConfig(classname, model).then(
                function success(data) {
                  $log.info('Total validation errors from API => ' + data.error_count);
                  //STEP 2: Get errors if any
                  angular.forEach(data.configs, function (config) {
                    if (data.error_count && config.value.errors.length > 0) {
                        errorConfigs.push(config.value);
                        $log.info(config.value.name + ' : ' + config.value.errors[0]);
                    }
                    if ( ( config.definition && config.definition.required == true) || ( (config.value.name.indexOf("topic") == 0) && (config.definition.documentation != "") ) ) {
                      requiredConfigKeys.push(config.value.name);
                    }
                    validConnectorConfigKeys.push(config.value.name);
                  });
                  console.log("Required/compulsory config keys: " + requiredConfigKeys);

                  angular.forEach(model, function (value, key) {
                    if (validConnectorConfigKeys.indexOf(key) === -1) {
                      var warning = { warnings : [ 'Warning: Config "' + key + '" is unknown' ] };
                      warningConfigs.push(warning);
                    } else if (value.length === 0) {
                      var errors = { errors : [ 'Config "' + key + '" requires a value' ] };
                      errorConfigs.push(errors);
                    }
                  });

                  if(errorConfigs == 0) {
                      $scope.validConfig = constants.VIEW_MESSAGE_CONNECTOR_VALID;
                      deferred.resolve(constants.VIEW_MESSAGE_CONNECTOR_VALID);
                  } else {
                      deferred.reject(errorConfigs);
                  }
                  $scope.errorConfigs = errorConfigs;
                  $scope.warningConfigs = warningConfigs;
                },
                function error(data, reason) {
                  const errorObject = JSON.parse(data.split('error:')[1])
                  $scope.errorConfigs = [];
                  $scope.errorConfigs.push({errors : [errorObject.message]})
                  deferred.reject(data);
                });
                return deferred.promise;
    }

  $scope.validateAndCreateConnector = function () {
    validateConnectorFn().then(function () {
      KafkaConnectFactory.postNewConnector(KafkaConnectFactory.transformNewConnectorRequestFromConfig($scope.model)).then(
        function successCallback(response) {
           console.log("POSTING " + JSON.stringify(response));
           $location.path("#/connector/" + response.name); //TODO location doesn't work, move to controller
           $rootScope.newConnectorChanges = true;
        });
    }, function () {
      $scope.validConfig = "Please fix the below issues";
      console.log("I can NOT post the connector - as validation errors exist");
    });

    }


  $scope.querySearch = function(query){
        return $http.get(env.KAFKA_REST() + '/topics')
        .then(function(response){
          return response.data.filter( function(topic) { return topic.indexOf(query) > -1 });
        })
      }; //for the autocomplete

  $scope.simpleName = function(connectorName) {
    if ((connectorName != undefined) && (connectorName.length > 10)) {
        return connectorName.replace('SourceConnector', '').replace('SinkConnector', '').replace('Stream','');
    } else {
        return "";
    }
  };

  function getClassConfig (pluginClass){
    var type="Unknown";
    var a = pluginClass.split('.');
    if (a[a.length-1].toLowerCase().indexOf('sink') > 0) {
      type="Sink";
      var myElements = [{key:'name',value: a[a.length-1], required: true}, {key:'connector.class', value: pluginClass, required: true},{key:'topics',value: 'TopicName_'+ a[a.length-1], required: true}, {key:'tasks.max',value: 1, required: true}];
    } else {
      type="Source";
      var myElements =  [{key:'name',value: a[a.length-1], required: true}, {key:'connector.class', value: pluginClass, required: true}, {key:'tasks.max',value: 1, required: true}];
    }

     // Find the correct connector Icon & documentation
     var connectorIcon = "connector.jpg";
     angular.forEach(supportedConnectorsTemplates, function (template) {
        if (template.class == pluginClass) {
            connectorIcon = template.icon;
            $scope.docs = template.docs;
        }
     });

     var connector = {
      name: a[a.length-1],
      class: pluginClass,
      icon: connectorIcon,
      isUndefined: true,
      type: type,
      template : [
       {
         step : "Basic Info",
         id : "step1",
         sections : [
         {
          elements : myElements
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

    if(connector.type === 'Sink'){
      request.data = '{ "connector.class" : "' + pluginClass + '", "topics" : "TopicName_'+ connector.name +'" }'
    }
    $http(request).then(function(data){
    angular.forEach(data.data.configs, function (config) {

      if (config.definition && config.definition.name !== 'name' && config.definition.name !== 'connector.class' && config.definition.required == true) {
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
       $scope.model = NewConnectorFactory.flattenConnectorTemplate(connector);
    });
  }

  $scope.getAllConfig = function (pluginClass) {
    if ($scope.showAllConfig) {
      $http({
         method: 'PUT',
         url: env.KAFKA_CONNECT() + '/connector-plugins/' + pluginClass + '/config/validate',
         data: '{ "connector.class" : "' + pluginClass + '" }',
         dataType: 'json',
         headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}
      }).then(function(data){
        var definition;
        var model = angular.copy($scope.model);
        var name;

        optionalConfig = {}; // keep track of new configuration options

        data.data.configs.forEach(function (config) {
          definition = config.definition;
          if(definition)
          name = definition.name;

          if (definition && angular.isUndefined($scope.model[name])) {
            optionalConfig[name] = model[name] = definition.default_value ? definition.default_value : '';
          }
        });

        $scope.noextraconfig = 0 === Object.keys(optionalConfig).length;

        if (!$scope.noextraconfig) {
          $scope.model = model;
        }
      });
    } else if (angular.isObject(optionalConfig)) {
      var model = angular.copy($scope.model);

      angular.forEach(optionalConfig, function (value, key) {
        delete model[key];
      });

      $scope.model = model;
    }
  }

});
