angularAPP.factory('supportedConnectorsFactory', function () {

 var supportedConnectors = (typeof supportedConnectorsTemplates !== "undefined") ? angular.copy(supportedConnectorsTemplates) : [];

  return {
    getSupportedConnectors : function() {
        return supportedConnectors;
    },

    getSupportedConnector: function () {
        return supportedConnectors;
    },

    matchesType: function (sourceOrSink) {
        return function(element) {
            return (element.type == sourceOrSink) && (element.uiEnabled == true); //TODO Lowercase them ?
        }
    },

    matchesName: function (name) {
        return function(element) {
            return (element.name == name) && (element.uiEnabled == true); //TODO Lowercase them ?
        }
    },

    matchesClass: function(config) {
        return matchesClass(config);
    },

    getAllClassFromTemplate: function () {
        var a =supportedConnectors.map(function (con) {
            return con.class;
        });
        return a;
    },

    getSupportedConnectorObj: function (connectorClass) {
         var filteredList = supportedConnectors.filter(matchesClass(connectorClass));
         if(filteredList.length == 1) return filteredList[0];
         //else return defaultConnectorInfo;
         else {
           var name =  connectorClass.split('.')[connectorClass.split('.').length-1]
           name = name.toUpperCase().replace('CONNECTOR', '')
           name = name.toUpperCase().replace('SINK', '')
           name = name.toUpperCase().replace('SOURCE', '')
           var connector = {name: name.substring(0,7), type: "", color: "gray", class: "" }
           return connector;
         }
    }
  };

  function matchesClass(config) {
    return function(element) {
    if (config) {
      return config.search(element.class) >= 0;
      } else {
      console.log('Null connector - Config not found');
      }
    }
  }

});