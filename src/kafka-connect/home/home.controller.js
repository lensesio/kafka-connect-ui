angularAPP.controller('HomeCtrl', function ($scope, $log, $http, env, constants, connectorObjects, $rootScope) {

    $scope.cluster = env.getSelectedCluster().NAME;
    $scope.rebalancingMessage = constants.MESSAGE_REBALANCING;
    $scope.welcomeMessage = constants.MESSAGE_WELCOME;
    $rootScope.rebalancing = true;

    $scope.rows = [];
    $scope.sources = [];
    $scope.sinks = [];
    $scope.allTopics = [];

    $http.get(env.KAFKA_CONNECT() + '/connectors').then(function(response){
        $scope.chartHeight = response.data.length * 45;
        angular.forEach(response.data, function(con){
           $http.get(env.KAFKA_CONNECT() + '/connectors/' + con).then(function(response){
                var connector = response.data;
                var row;
                var template = connectorObjects.getConnectorTemplate(connector.config);
                var topics = connectorObjects.getTopics(connector.config);
                var workers = connector.config["tasks.max"];
                var isSource = template.type == 'Source';
                var type = template.name;
                var color = template.color;
//                var html = createCustomHTMLContent(isSource, workers, type, color);
                isSource ? $scope.sources.push(connector) : $scope.sinks.push(connector);


                angular.forEach(topics, function(t) {
                     t = t + ' '

                    if(isSource) {
                       row = {c: [ {v: connector.name}, {v: t}, {v: 1}, {v: workers + ' workers'} ]};
                       row2 = {c: [ {v: t}, {v: getRandomName()}, {v: 0.0001}, {v: ''} ]};
                    } else {
                       row2 = {c: [ {v: getRandomName()}, {v: t}, {v: 0.0001}, {v: ''} ]};
                       row = {c: [ {v: t}, {v: connector.name}, {v: 1}, {v: workers + ' workers'} ]};
                    }
                    $scope.rows.push(row);
                    $scope.rows.push(row2);

                    $scope.allTopics.push(t);
                });
           });
        });
    },
    function (reason) {
         $log.error('Failed: ' + reason);
       }, function (update) {
         $log.info('Got notification: ' + update);
       });


    $scope.chartObject = {};

    $scope.chartObject.type = "Sankey";

    $scope.chartObject.data = {
        "cols":
        [
          {id: "f", label: "From", type: "string"},
          {id: "t", label: "To", type: "string"},
          {id: "w", label: "Weight", type: "number"},
          {id: "l",  label: "A", type: "string", role: "tooltip", 'p': {'html': true}},
        ],
        "rows": $scope.rows
      };


    $scope.chartObject.options = {
        width: '100%',
         sankey: {
         node: {
                  colors: [ '#4f6672', '#37474f', '#37474F', '#202F36', '#132731' ]
                }
                ,
                link: {
                          color: { fill: '#6B7B83' }
                      }
                },
        tooltip: { isHtml: true }
    };

    //TODO move me, i am generic
    Array.prototype.contains = function(v) {
        for(var i = 0; i < this.length; i++) {
            if(this[i] === v) return true;
        }
        return false;
    };

    //TODO move me, i am generic
    Array.prototype.unique = function() {
        var arr = [];
        for(var i = 0; i < this.length; i++) {
            if(!arr.contains(this[i])) {
                arr.push(this[i]);
            }
        }
        return arr;
    }

    function getRandomName() {
    var maximum = 1000;
    var minimum = 1;
       var randomInt = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
       var a = ' ';
      for(i = 0; i < randomInt; i++) {
            a = a + ' ';
       };
       return a;
    }
});
