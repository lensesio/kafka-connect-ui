/**
 * Kafka-Connect angularJS Factory
 * @see http://docs.confluent.io/3.0.1/connect/userguide.html#connectors
 */
angularAPP.service('KafkaConnectFactory', function ($rootScope, $http, $location, $q, $timeout, $mdDialog, $log, env, $injector) {

  var connectorNames = [];

  /**
   * Public API
   */
  return {

    getConnectorNames: function () {
        return connectorNames;
    },
    getConnectors: function (withMetadata) {
      var url = env.KAFKA_CONNECT() + '/connectors';
      return req('GET', url);
    },
    getConnectorInfo: function (connectorName) {
      var url = env.KAFKA_CONNECT() + '/connectors/' + connectorName;
      return req('GET', url);
    },
    getConnectorTasks: function (connectorName) {
      var url = env.KAFKA_CONNECT() + '/connectors/' + connectorName + '/tasks';
      return req('GET', url);
    },
    getConnectorStatus: function (connectorName) {

      var url = env.KAFKA_CONNECT() + '/connectors/' + connectorName + '/status';
//      return req('GET', url);
      return $http.get(url).then(function(response){
                return response;
            });
    },
    getConnectorPlugins: function () {
      var url = env.KAFKA_CONNECT() + '/connector-plugins/';
      return req('GET', url);
    },
    getConnectorConfig: function (connectorName) {
      var url = env.KAFKA_CONNECT() + '/connectors/' + connectorName + '/config';
      return req('GET', url);
    },
    transformNewConnectorRequestFromConfig: function (config) {
      var config = angular.copy(config);
      var name = config.name;

      delete config.name;

      return {
        name: name,
        config: config,
      };
    },
    postNewConnector: function (connector) {
      var url = env.KAFKA_CONNECT() + '/connectors';
      return req('POST', url, connector);
    },
    putConnectorConfig: function (connectorName, configuration) {
      var url = env.KAFKA_CONNECT() + '/connectors/' + connectorName + "/config";
      return req('PUT', url, configuration);
//      .then( function successCallback(response) {
////            _enhanceConnectorData(response)
//
//        });
    },
    deleteConnector: function (connectorName) {
      var url = env.KAFKA_CONNECT() + '/connectors/' + connectorName;
      return req('DELETE', url);
    },
    restartConnector: function (connectorName) {
      var url = env.KAFKA_CONNECT() + '/connectors/' + connectorName + "/restart";
      return req('POST', url);
    },
    restartTask: function (connectorName, taskId) {
      var url = env.KAFKA_CONNECT() + '/connectors/' + connectorName + '/tasks/' + taskId + "/restart";
      return req('POST', url);
    },
    pauseConnector: function (connectorName) {
      var url = env.KAFKA_CONNECT() + '/connectors/' + connectorName + "/pause";
      return req('PUT', url);
    },
    resumeConnector: function (connectorName) {
      var url = env.KAFKA_CONNECT() + '/connectors/' + connectorName + "/resume";
      return req('PUT', url);
    },
    validateConnectorConfig: function (classname, config) {
      var url = env.KAFKA_CONNECT() + '/connector-plugins/' + classname + '/config/validate'; //TODO double check that is classname here
      return req('PUT', url, config);
    },
    createCurlCommand: function (connector) {
      var data = createDataToPost(connector);
      var curlCommand = "cat << EOF > " + connector.config.name + ".json" + "\n" + angular.toJson(data, true) + "\n" + "EOF" + "\n";
      curlCommand = curlCommand + 'curl -X POST -H "Content-Type: application/json" -H "Accept: application/json" -d @' + connector.config.name + '.json ' + env.KAFKA_CONNECT() + '/connectors';
      return curlCommand;
    }
  };

   /* Private Methods */

   function req(method, url, data) {
       var deferred = $q.defer();
       var request = {
             method: method,
             url: url,
             data: data,
             dataType: 'json',
             headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}
           };

       $http(request)
         .success(function (response) {
            deferred.resolve(response);
          })
         .error(function (responseError) {
              var msg = "Failed at method [" + method + "] with error: \n" + JSON.stringify(responseError);
              $log.error(msg);
              if (angular.isObject(responseError) && responseError.error_code == 404) {
                $rootScope.notExists = true;
              }
              deferred.reject(msg);
          });

       return deferred.promise;
   }

   function setConnectorNames(connectors)  {
      connectorNames = connectors;
   }

   //TODO used in curl command only
    function createDataToPost(connector) {
      var data = {
        "name": connector.config.name,
        "config": {
          "connector.class": connector.config["connector.class"],
          "tasks.max": connector.config["tasks.max"].toString()
        }
      };

      if (connector.config)
      // Some connectors have 2 topics (i.e. Yahoo) - so skip in that case
        if (connector.config["kafka.topic"] != undefined) {
          var topicKey = connector.config["kafka.topic"].property;
          data.config[topicKey] = connector.config["kafka.topic"].default;
          angular.forEach(connector.template, function (value, key) {
            data.config[key] = value;
          });
        }

      angular.forEach(connector.template, function (value, key) {
        data.config[key] = value;
      });

      angular.forEach(connector.templateNumeric, function (value, key) {
        data.config[key] = value.default.toString();
      });

      angular.forEach(connector.templateOptions, function (value, key) {
        data.config[key] = value.default;
      });

      return data;
    }


});