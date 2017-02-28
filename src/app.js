'use strict';

var angularAPP = angular.module('angularAPP', [
  'ui.ace',
  'angularUtils.directives.dirPagination',
  'ngRoute',
  'ngMaterial',
  'ngAnimate',
  'ngAria',
  'ng',
  'ngMessages',
  'googlechart'
]);

angularAPP.controller('HeaderCtrl', function ($rootScope, $scope, $location, env) {


  $scope.$on('$routeChangeSuccess', function() {
     $rootScope.clusters = env.getClusters();
     $scope.cluster = env.getSelectedCluster();
     $scope.color = $scope.cluster.COLOR;
  });

  $scope.updateEndPoint = function(cluster) {
    $rootScope.connectionFailure = false;
    $location.path("/cluster/"+cluster)
  }
});

angularAPP.run(
    function loadRoute( env, $routeParams, $rootScope ) {
        $rootScope.$on('$routeChangeSuccess', function() {
          $rootScope.isHome = false;
          env.setSelectedCluster($routeParams.cluster);
       });
    }
)

/* Routing */

angularAPP.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'src/kafka-connect/home/home.html',
       controller: 'HomeCtrl'
    })
    .when('/cluster/:cluster', {
      templateUrl: 'src/kafka-connect/cluster-view/cluster-view.html',
       controller: 'ClusterViewCtrl'
    })
    .when('/cluster/:cluster/select-connector', {
      templateUrl: 'src/kafka-connect/select-type/sink-or-source.html',
      controller: 'SelectNewConnectorCtrl'
    })
    .when('/cluster/:cluster/create-connector/:type/:name', {
      templateUrl: 'src/kafka-connect/create-connector/create-connector.html',
      controller: 'CreateConnectorCtrl'
    })
    .when('/cluster/:cluster/create-connector/:name', {
      templateUrl: 'src/kafka-connect/create-connector/create-connector.html',
      controller: 'CreateConnectorCtrl'
    })
    .when('/cluster/:cluster/create-connector/:type/:name/:tab', {
      templateUrl: 'src/kafka-connect/create-connector/create-connector.html',
      controller: 'CreateConnectorCtrl'
    })
    .when('/cluster/:cluster/export-configs', {
      templateUrl: 'src/kafka-connect/export-configs/export-configs.html',
      controller: 'ExportConfigsCtrl'
    })
    .when('/cluster/:cluster/connector/:runningConnector', {
      templateUrl: 'src/kafka-connect/view/connector-view.html',
      controller: 'ConnectorDetailCtrl'
    }).otherwise({
    redirectTo: '/'
  });

});

/* App Config */

angularAPP.config(function ($mdThemingProvider, $httpProvider, $provide) {

 $httpProvider.interceptors.push('myHttpInterceptor');

 $mdThemingProvider.theme('default')
                   .primaryPalette('blue-grey')
                   .accentPalette('blue')
                   .warnPalette('grey');
});

angularAPP.config(['$compileProvider',
    function ($compileProvider) {
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|blob):/);
}]);

/* Google chart config */
angularAPP.value('googleChartApiConfig', {
  version: '1.1',
  optionalSettings: {
    packages: ['sankey'] //load just the package you want
  }
});

/* Custom directives */

angularAPP.directive('validJson', function() {
  return {
    require: 'ngModel',
    priority: 1000,
    link: function(scope, elem, attrs, ngModel) {

      // view to model
      ngModel.$parsers.unshift(function(value) {
        var valid = true,
          obj;
        try {
          obj = JSON.parse(value);
        } catch (ex) {
          valid = false;
        }
        ngModel.$setValidity('validJson', valid);
        return valid ? obj : undefined;
      });

      // model to view
      ngModel.$formatters.push(function(value) {
        return value;//JSON.stringify(value, null, '\t');
      });
    }
  };
});

/*
 * This directive runs on the 'name' input and checks if the name of the controller provided is unique.
 */
angularAPP.directive('uniqueControllerName', function(KafkaConnectFactory) {
  return {
    require : 'ngModel',
    link : function(scope, element, attrs, ngModel) {

         //Initially set the validity, so next button is disabled
        if(attrs.uniqueControllerName == 'name') {
          KafkaConnectFactory.getConnectors(true).then (function(connectors){
            scope.connectorNames = connectors
            scope.existsInit = scope.connectorNames.indexOf(scope.element.value) !== -1
            ngModel.$setValidity('unique', !scope.existsInit );
          });

          //As the user types
          ngModel.$parsers.push(function(value) {
              var exists = scope.connectorNames.indexOf(value) !== -1; //why exists doesnt work??
              ngModel.$setValidity('unique', !exists );
              return value;
          });

        }
    }
  }
});