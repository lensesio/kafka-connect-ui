angularAPP.factory('myHttpInterceptor', function($q, $injector, $log, $rootScope, env) {
    var pendingRequests = [];
    var incrementalTimeout = 1000;
    var start;

    /* Public Api */

    return {
      'request': function(request) {
        start = new Date().getTime();
        $rootScope.configValidationMessage = "";
        pendingRequests.push(request.url);
        return request;
      },

     'requestError': function(rejection) {
        return $q.reject(rejection);
      },

      'response': function(response) {
         if(response.config.url.startsWith(env.KAFKA_CONNECT()) && env.enableInterceptorLogs) {
            $log.debug("  curl -X  " + response.config.method + " " + response.config.url + " in [ " + (new Date().getTime() - start) + " ] msec");
            $log.info (response)
         }
         var index = pendingRequests.indexOf(response.config.url);
         // Remove from queue
         if (index !== -1) {
           pendingRequests.splice(index, 1);
         }

         if (pendingRequests.length == 0)
           $rootScope.rebalancing = false;

        return response;
      },
     'responseError': function(response) {
        if (response.status === -1 && response.data == null){
            $rootScope.rebalancing = false;
            $rootScope.connectionFailure = true;
        } else if ((response.status === 409 || response.status === 504 || response.status === 502)) {
            $rootScope.loading = true;
            if(response.status === 409) {
                $log.error("409 - cluster rebalance or restart is in process.")
                $rootScope.rebalancing = true;
                $rootScope.connectionFailure = false;
            }
            return retryRequest(response.config);
        } else {
            incrementalTimeout = 1000;
            $rootScope.configValidationMessage = 'An error occured with status code ' + response.status + ' : ' + response.statusText;
        }
        return $q.reject(response);
      }
    };

    /* Private Methods */

    function retryRequest (httpConfig) {
        $log.info("Retrying request... " + JSON.stringify(httpConfig))
        var $timeout = $injector.get('$timeout');

        return $timeout(function() {
            var $http = $injector.get('$http');
            return $http(httpConfig);
        }, incrementalTimeout);

        incrementalTimeout *= 2;

        if (incrementalTimeout >= 5000)
          incrementalTimeout = 5000;
    }
});