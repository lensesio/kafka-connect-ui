angularAPP.controller('ConnectorDetailCtrl', function ($rootScope, $scope, $routeParams, $timeout, $log, $location, $mdDialog, KafkaConnectFactory, connectorObjects, env) {

  $rootScope.selectedConnector = $routeParams.runningConnector;
  var runningConnector = $routeParams.runningConnector;
  var selectedConnector =  $routeParams.runningConnector;
  $scope.kafkaTopicsUI = env.KAFKA_TOPICS_UI();
  $scope.kafkaTopicsUIEnabled = env.KAFKA_TOPICS_UI_ENABLED();
  $scope.isEditing = false;
  $rootScope.rebalancing = true;
  $scope.showConfigSpinner = false;
  $scope.showTaskSpinner = false;
  init();

  function deepEqual(x, y) {
    const ok = Object.keys, tx = typeof x, ty = typeof y;
    return x && y && tx === 'object' && tx === ty ? (
      ok(x).length === ok(y).length &&
        ok(x).every(key => deepEqual(x[key], y[key]))
    ) : (x === y);
  }

  $scope.showTaskDetails = function (task) {
     // So that it closes the panel if it is clicked a second time
     if (deepEqual($scope.selectedTask , getSelectedTask($scope.connectorDetails.detailedTasks, task))) {
       console.log("Closing selected Task - as was clicked");
       $scope.selectedTask = null;
     } else {
        $scope.selectedTask = getSelectedTask($scope.connectorDetails.detailedTasks, task);
     }
     console.log(getSelectedTask($scope.connectorDetails.detailedTasks, task));
  };

  $scope.getCleanTopic = function (topic) {
    if (topic instanceof Array) {
        return topic.join(' ').split(':')[topic.length];
    } else {
        return topic;
    }
  };

  $scope.invalidateSelectedTask = function() {
    $scope.selectedTask = null;
  }

  $scope.pauseConnector = function (connectorName) {
    $rootScope.newConnectorChanges = true;
    KafkaConnectFactory.pauseConnector(connectorName).then(function(data) { init(); });
  };

  $scope.resumeConnector = function (connectorName) {
    $rootScope.newConnectorChanges = true;
    KafkaConnectFactory.resumeConnector(connectorName).then(function(data) { init(); });
  };

  $scope.restartConnector = function (connectorName) {
    KafkaConnectFactory.restartConnector(connectorName).then(function(data) { init(); });
    $rootScope.newConnectorChanges = true;
  };

  $scope.restartTask = function (connectorName, taskId) {
    KafkaConnectFactory.restartTask(connectorName, taskId).then(function(data) { init(); });
    $rootScope.newConnectorChanges = true;
  };

  $scope.updateConnector = function (connectorName, event, _editor) {
    $mdDialog.show(dialog('UPDATE', event)).then(function() {
        $scope.invalidateSelectedTask();
        updateConnector($scope.connectorDetails, _editor);
      });
  };

  $scope.deleteConnector = function (connector, event) {
    $mdDialog.show(dialog('DELETE', event)).then(function() {
       deleteConnector(connector);
    });
  };

  $scope.toggleEditor = function () {
    $scope.isEditing = !$scope.isEditing;

    if ($scope.isEditing) {
        $scope.model = angular.copy($scope.connectorDetails.config); // clone dirty model
    } else {
        $scope.errorConfigs = null;
    }
  };

  $scope.cancelEditor = function() {
    $scope.model = $scope.connectorDetails.config; // replace dirty model with pristine
    $scope.form.$setPristine();
    $scope.toggleEditor();
  }

  function init() {
   $log.info("initializing controller state..")
   connectorObjects.getConnector(selectedConnector).then(
      function success(connectorDetails) {
        $scope.connectorDetails = connectorDetails;
        $scope.model = connectorDetails.config;
        $scope.showTaskSpinner = false;
        $scope.showConfigSpinner = false;
        $rootScope.loading = false;
        $rootScope.rebalancing = false;
        $rootScope.newConnectorChanges = false;
      });
  }

  function updateConnector(connectorDetails, _editor) {
    var name = connectorDetails.name;
    var validationRequest = angular.copy($scope.model);

    validationRequest.name = name;

    KafkaConnectFactory
      .validateConnectorConfig(connectorDetails.config["connector.class"], validationRequest)
      .then(function (data) {
        var errorConfigs = parseValidationErrors(data);

        if (errorConfigs.length == 0) {
          $scope.toggleEditor();
          $scope.showConfigSpinner = true;
          $scope.showTaskSpinner = true;
          KafkaConnectFactory
            .putConnectorConfig(name, $scope.model)
            .then(function successCallback(data) { //TODO we ignore the response completely
              $scope.showConfigSpinner = false;
              $rootScope.newConnectorChanges = true;
              $scope.form.$setPristine();
              $timeout (function () { init(); }, 10000);
            }, function errorCallback(response) {
              $scope.showConfigSpinner = false;
              $scope.showTaskSpinner = false;
            });
        } else {
          $scope.errorConfigs = errorConfigs
        }
      });
  }

  function deleteConnector(connector) {
    KafkaConnectFactory.deleteConnector(connector).then(function (success) {
      $log.info('Success in connector deletion. Redirecting to / ');
      $rootScope.newConnectorChanges = true;
      $location.path("/#/");
    });
  }

  function parseValidationErrors(validationResponse) {
        $log.info('Total validation errors => ' + validationResponse.error_count);
        var errorConfigs = [];
          angular.forEach(validationResponse.configs, function (config) {
            if (config.value.errors.length > 0) {
                errorConfigs.push(config.value);
                $log.info(config.value.name + ' : ' + config.value.errors[0]);
            }
        });
        return errorConfigs;
    }

  function getSelectedTask(detailedTasks, task) {
     var selectedTask = { taskStatus : task, taskConfig : {} };
     angular.forEach(detailedTasks, function (ftask) {
        if(ftask.id.task == task.id) selectedTask.taskConfig = ftask;
     });
     return selectedTask
  }

  function dialog(type, event) {
    var dialog;
    switch(type) {
        case 'DELETE':
            dialog = $mdDialog.confirm()
                .title('Delete connector')
                .textContent("This will halt all tasks, and delete the connector and it's configuration")
                .targetEvent(event)
                .ok('DELETE')
                .cancel('CANCEL');
            break;
        case 'UPDATE':
            dialog = $mdDialog.confirm()
                .title('Are you sure you want to update the connector?')
                .textContent("This may rebalance and restart the connect cluster")
                .targetEvent(event)
                .ok('UPDATE')
                .cancel('CANCEL');
            break;
//        default:
//            default ""
    }
    return dialog;
  }
});
