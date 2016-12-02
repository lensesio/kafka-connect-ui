angularAPP.factory('env', function ($rootScope) {

//  var ENV = clusters; //TODO if empty env.js

  var clusterArray = (typeof clusters !== "undefined") ? angular.copy(clusters) : [];
  var selectedCluster = null;
  setCluster();

  return {
    setSelectedCluster : function(clusterName) { setCluster(clusterName)},
    getSelectedCluster : function() { return selectedCluster; },
    getClusters : function() { return clusters} ,

    KAFKA_REST : function () { return selectedCluster.KAFKA_REST; },
    KAFKA_CONNECT : function () { return selectedCluster.KAFKA_CONNECT; },
    KAFKA_TOPICS_UI : function () { return selectedCluster.KAFKA_TOPICS_UI; },
    KAFKA_TOPICS_UI_ENABLED :  function () { return selectedCluster.KAFKA_TOPICS_UI_ENABLED; },

    enableInterceptorLogs : false,
  }

  function setCluster(clusterName) {
    if(clusterArray.length == 0) {
        $rootScope.missingEnvJS = true;
              console.log("NOT EXISTS env.js")
     }
     if(angular.isUndefined(clusterName)) {
          selectedCluster = clusterArray[0];
     } else {
          var filteredArray = clusterArray.filter(function(el) {return el.NAME == clusterName})
          selectedCluster = filteredArray.length == 1 ?  filteredArray[0]  : clusterArray[0]
     }
  }
});