angularAPP.controller('ConnectorDetailCtrl', function ($rootScope, $scope, $routeParams, $timeout, $log, $location, $mdDialog, KafkaConnectFactory, connectorObjects, constants, env) {

  $rootScope.selectedConnector = $routeParams.runningConnector;
  var runningConnector = $routeParams.runningConnector;
  var selectedConnector =  $routeParams.runningConnector;
  $scope.invalidSyntaxMessage = constants.VIEW_EDITOR_INVALID_SYNTAX;
  $scope.kafkaTopicsUI = env.KAFKA_TOPICS_UI();
  $scope.kafkaTopicsUIEnabled = env.KAFKA_TOPICS_UI_ENABLED();
  $scope.aceReady = false;
  $scope.connectorConfigurationEditable = true;
  $rootScope.rebalancing = true;
  $scope.showConfigSpinner = false;
  $scope.showTaskSpinner = false;
  $scope.actionsDisabled = true;
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

  $scope.validateConnector = function (object, _editor) {
      $scope.validConfig = "";
      KafkaConnectFactory.validateConnectorConfig(object.config["connector.class"], $scope.connectorDetails.connectorDetailsInString).then(
        function(data) {
          $scope.errorConfigs = parseValidationErrors(data);
          $scope.aceValidate(_editor);
          if($scope.errorConfigs.length == 0) {
              $scope.validConfig = constants.VIEW_MESSAGE_CONNECTOR_VALID;
          }
      });
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
    $scope.connectorConfigurationEditable = !$scope.connectorConfigurationEditable;
    if (!$scope.connectorConfigurationEditable) {
        $scope.aceBackgroundColor = "rgba(0, 128, 0, 0.04)";
        $scope.showSyntaxValidation = true;
    } else {
        $scope.aceBackgroundColor = "#fff";
        $scope.validConfig = "";
        $scope.showSyntaxValidation = false;
        invalidateEditorMarkers();
        $scope.errorConfigs = null;
    }
  };

  $scope.cancelEditor = function() {
    $scope.connectorDetails.connectorDetailsInString = $scope.connectorDetailsInStringBefore;
    $scope.toggleEditor();
  }

  $scope.aceLoaded = function (_editor) {
    $scope.editor = _editor;
    $scope.editor.$blockScrolling = Infinity;
    $scope.acePropertyFileSession = _editor.getSession();
    var lines = $scope.connectorDetails.connectorDetailsInString.split("\n").length;
    _editor.setOptions({
      minLines: lines,
      maxLines: lines,
      highlightActiveLine: false
    });
  };

  $scope.aceChanged = function (_editor) {
    $scope.editor = _editor;
    $scope.editor.$blockScrolling = Infinity;
    var aceContent = $scope.acePropertyFileSession.getDocument().getValue();
    $scope.connectorDetails.connectorDetailsInString = aceContent;
  };

  var  markerRange;
  $scope.aceValidate = function (_editor) {
      var Range = ace.require('ace/range').Range;
      invalidateEditorMarkers();
      var errorLines = calculateErrorLines();
      $scope.errorIds = [];
      angular.forEach(errorLines, function (errorline) {
        markerRange = new Range(errorline, 1, errorline, 2);
        markerRange.id =  $scope.acePropertyFileSession.addMarker( markerRange, "myMarker", "fullLine", "ace_error");
        $scope.errorIds.push(markerRange.id );
      });
   };

  $scope.$watch('connectorDetails.connectorDetailsInString', function() {
       if($scope.connectorDetails != undefined && $scope.connectorDetailsInStringBefore != undefined) {
            if($scope.connectorDetails.connectorDetailsInString.trim() == $scope.connectorDetailsInStringBefore.trim()) {
                $scope.actionsDisabled = true
            } else {
                $scope.actionsDisabled = false;
            }
       }
  });

  function init() {
   $log.info("initializing controller state..")
   connectorObjects.getConnector(selectedConnector).then(
      function success(connectorDetails) {
        $scope.connectorDetails = connectorDetails;
        $scope.aceReady = true;
        $scope.connectorDetailsInStringBefore = angular.toJson(connectorDetails.config, true);
        $scope.showTaskSpinner = false;
        $scope.showConfigSpinner = false;
        $rootScope.loading = false;
        $rootScope.rebalancing = false;
        $rootScope.newConnectorChanges = false;
      });
  }

  function updateConnector(connectorDetails, _editor) {
      $scope.validConfig = "";
      var connectorDetailsInString = connectorDetails.connectorDetailsInString;

      KafkaConnectFactory
            .validateConnectorConfig(connectorDetails.config["connector.class"], connectorDetailsInString)
            .then(function successCallback(data) {
                  var errorConfigs = parseValidationErrors(data);
                  if(errorConfigs.length == 0) {
                        $scope.toggleEditor();
                        $scope.showConfigSpinner = true;
                        $scope.showTaskSpinner = true;
                        KafkaConnectFactory
                               .putConnectorConfig(connectorDetails.name, connectorDetailsInString)
                               .then(function successCallback(data) { //TODO we ignore the response completely
                                  $scope.showConfigSpinner = false;
                                  $rootScope.newConnectorChanges = true;
                                  $timeout (function () { init(); }, 10000);
                               }, function errorCallback(response) {
                                  $scope.showConfigSpinner = false;
                                  $scope.showTaskSpinner = false;
                               });
                  } else {
                      $scope.errorConfigs = errorConfigs
                      $scope.aceValidate(_editor);
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

  function invalidateEditorMarkers() {
    angular.forEach($scope.errorIds, function (errorId) {
        $scope.acePropertyFileSession.removeMarker(errorId);
    });
  }

  function calculateErrorLines() {
      var errorLines = [];
      var keys = Object.keys(angular.fromJson($scope.connectorDetails.connectorDetailsInString));
      angular.forEach($scope.errorConfigs, function(error){
          var line = keys.indexOf(error.name) + 1;
          if (line != 0)
          errorLines.push(line);
      });
      return errorLines;
  }
});




