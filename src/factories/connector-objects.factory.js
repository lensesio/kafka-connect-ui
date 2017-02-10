angularAPP.factory('connectorObjects', function (KafkaConnectFactory, supportedConnectorsFactory, $q, $rootScope) {


    return {
       getConnectorList : function () {
            return KafkaConnectFactory.getConnectors(true).then(function successCallback(connectors) {
                  return enhanceConnectors(connectors);
            });
       },
       getConnector : function (connectorName) {
           return KafkaConnectFactory.getConnectorInfo(connectorName).then(function successCallback(connector) {
               return enhanceConnector(connector);
          });
       },
       getTopics : function(connectorConfig) {
           return extractTopicsFromConfig(connectorConfig);
       },
       getConnectorTemplate : function(connectorConfig) {
           return supportedConnectorsFactory.getSupportedConnectorObj(connectorConfig["connector.class"]);
       }

    };

    function enhanceConnector(connector, isList) {

        var enhancedConnector;
        var connectorName = connector.name;
        var connectorConfig = connector.config;
        var connectorUiInfo = supportedConnectorsFactory.getSupportedConnectorObj(connectorConfig["connector.class"]);
        var connectorStatus = getConnectorStatus(connectorName);

        if(isList) {
            enhancedConnector =  {
                name: connectorName,
                isSource: (connectorUiInfo.type == 'Source'),
                type: connectorUiInfo.name,
                color: connectorUiInfo.color,
                connectorState: connectorStatus.connector,// getConnectorStatus(connectorName),
                tasks: connectorStatus.tasks,
                workers: connectorConfig["tasks.max"]
            };
        } else { //Is detail
            enhancedConnector =  {
                name: connectorName,
                config: connectorConfig,
                isSource: (connectorUiInfo.type == 'Source'),
                type: connectorUiInfo.name,
                color: connectorUiInfo.color,
                connectorState: connectorStatus.connector,//getConnectorStatus(connectorName),
                topics: extractTopicsFromConfig(connectorConfig),
                workers: connectorConfig["tasks.max"],
                tasks: connectorStatus.tasks,//getTaskStatus(connectorName).tasks,
                detailedTasks: getTaskDetails(connectorName),
                connectorDetailsInString : angular.toJson(connectorConfig, true),
                supportedConnectorTemplate : connectorUiInfo
            };
        }
        return enhancedConnector;
      }

      function enhanceConnectors(connectors) {
          var allConnectorsWithMetadata = [];
          angular.forEach(connectors, function(connectorName) {
              KafkaConnectFactory.getConnectorInfo(connectorName)
                 .then( function successCallback(connectorInfo) {
                     return enhanceConnector(connectorInfo, true);
                 })
                 .then(function successCallback(enhancedConnector){
                      return allConnectorsWithMetadata.push(enhancedConnector);
                 })
          })
         return allConnectorsWithMetadata;
      }

      function extractTopicsFromConfig(connectorConfig) {
        var topics = [];
        angular.forEach(connectorConfig, function (value, key) {
            // adding extra logic to capture information about FTP Source connectors
            if (key.indexOf("connect.ftp.monitor") != -1) {
                var setup = value.split(": ");
                topics.push(setup)
            }
            if (key.indexOf("topic") != -1) {
              var tArray = value.split(",");
              if(tArray.length > 1) {
                   angular.forEach(tArray, function (t) {
                        topics.push(t)
                   })
              } else {
                topics.push(value);
              }
            }
        });
        return topics;
      }

      function getTaskDetails(connectorName) {
         var itemArray = [];
         KafkaConnectFactory.getConnectorTasks(connectorName).then(
          function success(items) {
             angular.forEach(items, function (item) {
                 itemArray.push(item);
              });
         });
        return itemArray;
      }

      function getConnectorStatus(connectorName) {
          var tasks=[];
          var statuses = {};
          var status = {
              tasks : {},
              connector : {}
              };

          KafkaConnectFactory.getConnectorStatus(connectorName).then( function success(data) { //We get the taks details from status
            statuses[connectorName] = data.data.connector.state;
            angular.forEach(data.data.tasks, function (task) {
                tasks.push(task);
            });
          });

          status.tasks = tasks;
          status.connector = statuses;
          return status;

       }

       //      function getConnectorStatus(connectorName, isList) {
       //        var statuses = {};
       //        KafkaConnectFactory.getConnectorStatus(connectorName).then(function(data) {
       //                statuses[connectorName] = data.data.connector.state;
       //         })
       //         return statuses;
       //      }
       //
       //      function getTaskStatus(connectorName) {
       //          var tasks=[];
       //          var status = { tasks : {} };
       //          KafkaConnectFactory.getConnectorStatus(connectorName).then( function success(status) {
       //            angular.forEach(status.data.tasks, function (task) {
       //                tasks.push(task);
       //            });
       //          });
       //          status.tasks = tasks;
       //          return status;
       //      }

});