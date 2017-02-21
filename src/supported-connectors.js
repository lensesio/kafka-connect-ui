var supportedConnectorsTemplates = [{
  name: "twitter",
  icon: 'twitter.png',
  description: 'Subscribe to feeds using the Twitter API and stream data into a kafka topic',
  type: "Source",
  uiEnabled: true,
  color: "#1da1f3",
  class: "com.eneco.trading.kafka.connect.twitter.TwitterSourceConnector",
  template: [{
   step: "Basic Info",
   id: "step1",
   sections: [{
    section: "Basic connector information",
    elements: [{
     key: 'name',
     value: 'twitter-source',
     label: 'Connector Name',
     tooltip: ' The (unique) connector name',
     type: 'text',
     placeholder: 'ie.twitter-source',
     required: true,
     flex: "100",
     errorMessage: "Connector Name is required field and must be unique"
    }, {
     key: 'topic',
     value: 'twitter',
     element: 'input',
     label: 'Topic',
     tooltip: 'The Kafka topic to read from',
     type: 'text',
     placeholder: 'ie.twitter',
     required: true,
     flex: "50",
     errorMessage: "Kafka Topic is required field"
    }, {
     key: 'tasks.max',
     value: 1,
     element: 'input',
     label: 'Max Tasks',
     tooltip: 'The number of tasks the connector is allowed to start (max is 5)',
     type: 'number',
     max: 5,
     min: 1,
     required: false,
     flex: 50,
     errorMessage: "Max tasks should be between blah blah"
    }, {
     key: 'connector.class',
     value: 'com.eneco.trading.kafka.connect.twitter.TwitterSourceConnector',
     type: 'hidden',
     required: true,
     flex: "100"
    }]
   }]
  }, {
   step: "Advanced Options",
   id: "step2",
   sections: [{
    section: "Twitter Options",
    elements: [{
     key: 'track.terms',
     value: '#ApacheSpark,#ApacheFlink,#ApacheKafka',
     label: 'Track Terms',
     tooltip: '',
     type: 'text',
     placeholder: 'ie.#ApacheSpark,#ApacheFlink,#ApacheKafka',
     required: false,
     flex: "100"
    }, {
     key: 'track.locations',
     value: '',
     label: 'Geographic Locations',
     tooltip: '',
     type: 'text',
     placeholder: '',
     required: false,
     flex: "100"
    }, {
     key: 'track.follow',
     value: '',
     label: 'Twitter Users',
     tooltip: '',
     type: 'text',
     placeholder: '',
     required: false,
     flex: "100"
    }]
   }, {
    section: "Twitter Options - Keys and passwords",
    elements: [{
     key: 'twitter.token',
     value: '',
     label: 'Twitter Access Token',
     tooltip: '',
     type: 'text',
     placeholder: 'ie.#ApacheSpark,#ApacheFlink,#ApacheKafka',
     required: false,
     flex: "100"
    }, {
     key: 'twitter.secret',
     value: '',
     label: 'Twitter Token Secret',
     tooltip: '',
     type: 'text',
     placeholder: '',
     required: false,
     flex: "100"
    }, {
     key: 'twitter.consumerkey',
     value: '',
     label: 'Twitter Consumer Key',
     tooltip: '',
     type: 'text',
     placeholder: '',
     required: false,
     flex: "100"
    }, {
     key: 'twitter.consumersecret',
     value: '',
     label: 'Twitter Consumer Secret',
     tooltip: '',
     type: 'text',
     placeholder: '',
     required: false,
     flex: "100"
    }]
   }, {
    section: "More options",
    elements: [{
     key: 'language',
     value: '',
     label: 'Language',
     tooltip: 'Comma-separated list of BCP 47 languages to fetch',
     type: 'text',
     placeholder: '',
     required: false,
     flex: "100"
    }, {
     key: 'batch.size',
     value: 100,
     label: 'Flush after this many tweets',
     tooltip: 'Tweets are accumulated and flushed as a batch into Kafka; when the batch is larger than batch.size or when the oldest tweet in it is older than batch.timeout [s], it is flushed.',
     type: 'number',
     min: 1,
     max: 100000,
     step: 10,
     placeholder: '',
     required: false,
     flex: "100"
    }]
   }]
  }],
 },
 {
  name: "ftp",
  icon: "file.png",
  class: "com.datamountaineer.streamreactor.connect.ftp.FtpSourceConnector",
  description: "Tail directories in remote FTP location and bring messages in Kafka",
  type: "Source",
  uiEnabled: true,
  color: "#b1b1b1",
  template: [{
   step: "Basic Info",
   id: "step1",
   sections: [{
     section: "Basic connector information",
     elements: [{
      key: 'name',
      value: 'ftp-connector',
      label: 'Connector Name',
      tooltip: ' The (unique) connector name',
      type: 'text',
      placeholder: 'ie.ftp-connector',
      required: true,
      flex: "100",
      errorMessage: "Connector Name is required field and must be unique"
     }, {
      key: 'tasks.max',
      value: 1,
      element: 'input',
      label: 'Max Tasks',
      tooltip: 'The number of tasks the connector is allowed to start (max is 5)',
      type: 'number',
      max: 5,
      min: 1,
      required: true,
      flex: 50,
      errorMessage: "Max 5 tasks"
     }, {
      key: 'connect.ftp.monitor.tail',
      value: 'multichannel/*.csv:multichannel',
      element: 'input',
      label: 'Remote FTP location:topicName',
      tooltip: 'Comma separated tuples of folders and topics',
      type: 'text',
      required: true,
      errorMessage: "Must setup FTP monitor.tail or monitor.update"
     }, {
      key: 'connect.ftp.keystyle',
      value: 'struct',
      element: 'input',
      label: 'struct or string',
      tooltip: 'How to key your messages',
      type: 'text',
      required: true,
      errorMessage: "Must setup FTP keystyle"
     }, {
      key: 'connect.ftp.file.maxage',
      value: 'P14D',
      element: 'input',
      label: 'Do not care for files older than the particular duration',
      tooltip: 'i.e. ignore files older than 14 days',
      type: 'text',
      required: true,
      errorMessage: "Must setup FTP maxage"
     }, {
      key: 'connect.ftp.refresh',
      value: 'PT1M',
      element: 'input',
      label: 'Poll time in iso8086 duration format',
      tooltip: 'Poll FTP every 1 minute by default',
      type: 'text',
      required: true,
      errorMessage: "Must setup FTP refresh"
     }, {
      key: 'connect.ftp.password',
      value: 'xxxxxx',
      element: 'input',
      label: 'FTP Password',
      tooltip: 'The FTP password',
      type: 'text',
      required: true,
      errorMessage: "Must setup FTP password"
     }, {
      key: 'connect.ftp.user',
      value: 'Antwnis',
      element: 'input',
      label: 'FTP User',
      tooltip: 'The FTP username',
      type: 'text',
      required: true,
      errorMessage: "Must setup FTP username"
     }, {
      key: 'connect.ftp.address',
      value: '192.168.0.15:21',
      element: 'input',
      label: 'FTP Server',
      tooltip: 'The host and port of the remote FTP server',
      type: 'text',
      required: true,
      errorMessage: "Must setup FTP Address"
     }, {
      key: 'connector.class',
      value: 'com.datamountaineer.streamreactor.connect.ftp.FtpSourceConnector',
      type: 'hidden',
      required: true,
      flex: "100"
     }]
    }] //end of sections
  }]
 },
 {
  name: "file",
  icon: "file.png",
  class: "org.apache.kafka.connect.file.FileStreamSourceConnector",
  description: "Read files and stream data into Kafka Topics",
  type: "Source",
  uiEnabled: true,
  color: "#b1b1b1",
  template: [{
   step: "Basic Info",
   id: "step1",
   sections: [{
     section: "Basic connector information",
     elements: [{
      key: 'name',
      value: 'file-connector',
      label: 'Connector Name',
      tooltip: ' The (unique) connector name',
      type: 'text',
      placeholder: 'ie.file-connector',
      required: true,
      flex: "100",
      errorMessage: "Connector Name is required field and must be unique"
     }, {
      key: 'topic',
      value: 'kafka-connect-logs',
      element: 'input',
      label: 'Topic',
      tooltip: 'The Kafka topic to read from',
      type: 'text',
      placeholder: 'ie.kafka-connect-logs',
      required: true,
      flex: "50",
      errorMessage: "You need to select an existing topic"
     }, {
      key: 'tasks.max',
      value: 1,
      element: 'input',
      label: 'Max Tasks',
      tooltip: 'The number of tasks the connector is allowed to start (max is 5)',
      type: 'number',
      max: 5,
      min: 1,
      required: true,
      flex: 50,
      errorMessage: "Max 5 tasks"
     }, {
      key: 'file',
      value: '/var/log/ansible-confluent/connect.log',
      element: 'input',
      label: 'File',
      tooltip: 'The source file for the connector',
      type: 'text',
      required: true,
      errorMessage: "Must use a file"
     }, {
      key: 'connector.class',
      value: 'org.apache.kafka.connect.file.FileStreamSourceConnector',
      type: 'hidden',
      required: true,
      flex: "100"
     }]
    }] //end of sections
  }]
 }, {
  name: "Blockchain",
  icon: "blockchain-logo.jpg",
  description: "A Connector to hook into the live streaming providing a real time feed for new bitcoin blocks and transactions provided by www.blochain.info ",
  class: "com.datamountaineeer.streamreactor.connect.blockchain.source.BlockchainSourceConnector",
  type: "Source",
  uiEnabled: true,
  color: "#b1b1b1",
  template: [{
   step: "Basic Info",
   id: "step1",
   sections: [{
     section: "Basic connector information",
     elements: [{
      key: 'name',
      value: 'blockchain-source',
      label: 'Connector Name',
      tooltip: ' The (unique) connector name',
      type: 'text',
      placeholder: 'ie.blockchain-source',
      required: true,
      flex: "100",
      errorMessage: "Connector Name is required field and must be unique"
     }, {
      key: 'connect.blockchain.source.kafka.topic',
      value: 'kafka-connect-logs',
      element: 'input',
      label: 'Topic',
      tooltip: 'The Kafka topic to read from',
      type: 'text',
      placeholder: 'ie.kafka-connect-logs',
      required: true,
      flex: "50",
      errorMessage: "You need to select an existing topic"
     }, {
      key: 'tasks.max',
      value: 1,
      element: 'input',
      label: 'Max Tasks',
      tooltip: 'The number of tasks the connector is allowed to start (max is 5)',
      type: 'number',
      max: 5,
      min: 1,
      required: true,
      flex: 50,
      errorMessage: "Max 5 tasks"
     }, {
      key: 'connector.class',
      value: 'com.datamountaineeer.streamreactor.connect.blockchain.source.BlockchainSourceConnector',
      type: 'hidden',
      required: true,
      flex: "100"
     }]
    }] //end of sections
  }]
 }, {
  name: "slack",
  type: "Source",
  description: "Your Slack bot reads messages from the channel that your is in and sends JSon data to Kafka",
  uiEnabled: true,
  icon: "slack.png",
  color: "#e01765",
  class: "SlackSourceConnector",
  template: [{
   step: "Basic Info",
   id: "step1",
   sections: [{
     section: "Basic connector information",
     elements: [{
      key: 'name',
      value: 'slack-source',
      label: 'Connector Name',
      tooltip: ' The (unique) connector name',
      type: 'text',
      placeholder: 'ie.slack-source',
      required: true,
      flex: "100",
      errorMessage: "Connector Name is required field and must be unique"
     }, {
      key: 'topic',
      value: 'slack-logs',
      element: 'input',
      label: 'Topic',
      tooltip: 'The Kafka topic to read from',
      type: 'text',
      placeholder: 'ie.slack-logs',
      required: true,
      flex: "50",
      errorMessage: "You need to select an existing topic"
     }, {
      key: 'tasks.max',
      value: 1,
      element: 'input',
      label: 'Max Tasks',
      tooltip: 'The number of tasks the connector is allowed to start (max is 5)',
      type: 'number',
      max: 5,
      min: 1,
      required: true,
      flex: 50,
      errorMessage: "Max 5 tasks"
     }, {
      key: 'slack.apikey',
      value: 'xoxb-67875382820-qBiDwaDSa8YW7Sf1zwX8p6RR',
      element: 'input',
      label: 'Slack Api Key',
      tooltip: 'Slack api key',
      type: 'text',
      required: true,
      errorMessage: "Must use an api key"
     }]
    }] //end of sections
  }]
 }, {
  name: "bloomberg",
  icon: "bloomberg.png",
  description: "a source connector to subscribe to Bloomberg feeds via the Bloomberg labs open API and write to Kafka.",
  class: "com.datamountaineer.streamreactor.connect.bloomberg.BloombergSourceConnector",
  type: "Source",
  uiEnabled: true,
  color: "#a65674",
  template: [{
     step: "Basic Info",
     id: "step1",
     sections: [{
       section: "Basic connector information",
       elements: [{
        key: 'name',
        value: 'bloomberg-source',
        label: 'Connector Name',
        tooltip: ' The (unique) connector name',
        type: 'text',
        placeholder: 'ie.bloomberg-source',
        required: true,
        flex: "100",
        errorMessage: "Connector Name is required field and must be unique"
       }, {
        key: 'kafka.topic',
        value: 'kafka-connect-logs',
        element: 'input',
        label: 'Topic',
        tooltip: 'The Kafka topic to read from',
        type: 'text',
        placeholder: 'ie.kafka-connect-logs',
        required: true,
        flex: "50",
        errorMessage: "You need to select an existing topic"
       }, {
        key: 'tasks.max',
        value: 1,
        element: 'input',
        label: 'Max Tasks',
        tooltip: 'The number of tasks the connector is allowed to start (max is 5)',
        type: 'number',
        max: 5,
        min: 1,
        required: true,
        flex: "50",
        errorMessage: "Max 5 tasks"
       }, {
        key: 'connector.class',
        value: 'com.datamountaineer.streamreactor.connect.bloomberg.BloombergSourceConnector',
        type: 'hidden',
        required: true,
        flex: "100"
       }]
      }] //end of sections
    }, //end of step
    {
     step: "Advanced Options",

     id: "step2",
     sections: [{
        section: "Bloomberg Configuration",
        elements: [{
         key: 'connect.bloomberg.subscriptions',
         value: 'AAPL US Equity:LAST_PRICE,BID,ASK;IBM US Equity:BID,ASK,HIGH,LOW,OPEN',
         label: 'Bloomberg Subscriptions',
         tooltip: '',
         type: 'text',
         placeholder: 'AAPL US Equity:LAST_PRICE,BID,ASK;IBM US Equity:BID,ASK,HIGH,LOW,OPEN',
         required: false,
         flex: "100"
        }, {
         key: 'connect.bloomberg.authentication.mode',
         value: 'APPLICATION_ONLY',
         label: 'Bloomberg authentication mode',
         tooltip: 'The mode to authentication against the Bloomberg server. Either APPLICATION_ONLY or USER_AND_APPLICATION.',
         type: 'text',
         placeholder: 'APPLICATION_ONLY',
         required: true,
         flex: "100"
        }, {
         key: 'kafka.topic',
         value: 'bloomberg',
         label: 'Kafka Topic',
         tooltip: '',
         type: 'text',
         placeholder: 'bloomberg',
         required: false,
         flex: "50"
        }, {
         key: 'connect.bloomberg.buffer.size',
         value: 4096,
         label: 'Kafka Topic',
         tooltip: '',
         type: 'number',
         min: 1,
         max: 100000,
         placeholder: '4096',
         required: false,
         flex: "50"
        }]
       }, {
        section: "Bloomberg Server Comfiguration",
        elements: [{
         key: 'connect.bloomberg.server.host',
         value: 'localhost',
         label: 'Bloomberg Server Host',
         tooltip: 'The bloomberg endpoint to connect to.',
         type: 'text',
         placeholder: 'localhost',
         required: false,
         flex: "33"
        }, {
         key: 'connect.bloomberg.server.port',
         value: 8194,
         label: 'Bloomberg Server Port',
         tooltip: 'The Bloomberg endpoint to connect to.',
         type: 'number',
         placeholder: 'localhost',
         required: false,
         flex: "33"
        }, {
         key: 'connect.bloomberg.service.uri',
         value: '//blp/mkdata',
         label: 'Bloomberg Service Uri',
         tooltip: 'Which Bloomberg service to connect to. Can be //blp/mkdata or //blp/refdata.',
         type: 'text',
         placeholder: '//blp/mkdata',
         required: false,
         flex: "33"
        }]
       }


      ] //end of sections
    }
   ] //end of template
 }, {
  name: "cassandra",
  icon: "cassandra.jpg",
  description: "The Cassandra sink connector allows you to write data from a Kafka topic into a Cassandra table.",
  class: "com.datamountaineer.streamreactor.connect.cassandra.sink.CassandraSinkConnector",
  uiEnabled: true,
  type: "Sink",
  color: "#1a9f85",
  template: [{
     step: "Basic Info",
     id: "step1",
     sections: [{
       section: "Basic connector information",
       elements: [{
        key: 'name',
        value: 'cassandra-sink-orders',
        label: 'Connector Name',
        tooltip: ' The (unique) connector name',
        type: 'text',
        placeholder: 'ie.cassandra-sink-orders',
        required: true,
        flex: "100",
        errorMessage: "Connector Name is required field and must be unique"
       }, {
        key: 'topics',
        value: 'order-topics',
        element: 'input',
        label: 'Topic',
        tooltip: 'The Kafka topic to write to',
        type: 'text',
        placeholder: 'ie.order-topics',
        required: true,
        flex: "100",
        errorMessage: "You need to select an existing topic"
       }, {
        key: 'connect.cassandra.import.mode',
        value: 'incremental',
        element: 'input',
        label: 'Import mode',
        tooltip: 'The import mode, either incremental or bulk.',
        type: 'text',
        placeholder: 'ie.kafka-connect-logs',
        required: true,
        flex: "50",
        errorMessage: "You need to select an existing topic"
       }, {
        key: 'tasks.max',
        value: 1,
        element: 'input',
        label: 'Max Tasks',
        tooltip: 'The number of tasks the connector is allowed to start (max is 5)',
        type: 'number',
        max: 5,
        min: 1,
        required: true,
        flex: "50",
        errorMessage: "Max 5 tasks"
       }, {
        key: 'connector.class',
        value: 'com.datamountaineer.streamreactor.connect.cassandra.sink.CassandraSinkConnector',
        type: 'hidden',
        required: true,
        flex: "100"
       }]
      }] //end of sections
    }, //end of step
    {
     step: "Advanced Options",
     id: "step2",
     sections: [{
        section: "Kafka-Connect Query Language (KCQL)",
        elements: [{
         key: 'connect.cassandra.export.route.query',
         value: 'INSERT INTO TABLE1 SELECT * FROM TOPIC1;INSERT INTO TABLE2 SELECT field1,field2, field3 as renamedField FROM TOPIC2',
         label: 'KCQL',
         tooltip: 'The table to topic import map. This allows you to route tables to different topics. Each mapping is comma separated and for each mapping the table and topic are separated by a colon, if no topic is provided the records from the table will be routed to a topic matching the table name. In this example the orders table records are routed to the topic orders-topic. This property sets the tables to import!',
         type: 'text',
         placeholder: 'SELECT * from TOPIC',
         required: true,
         flex: "100"
        }]
       }, {

        section: "Cassandra Configuration",
        elements: [{
          key: 'connect.cassandra.contact.points',
          value: 'localhost',
          label: 'Cassandra Host',
          tooltip: 'The ip or host name of the nodes in the Cassandra cluster to connect to.',
          type: 'text',
          placeholder: 'localhost',
          required: true,
          flex: "50"
         },

         {
          key: 'connect.cassandra.port',
          value: 9042,
          label: 'Cassandra port',
          tooltip: '',
          type: 'number',
          placeholder: '9042',
          max: 100000,
          min: 1,
          required: false,
          flex: "50"
         },

         {
          key: 'connect.cassandra.key.space',
          value: 'demo',
          label: 'Cassandra Key Space',
          tooltip: 'The keyspace (demo) we are connecting to.',
          type: 'text',
          placeholder: 'demo',
          required: false,
          flex: "33"
         },

         {
          key: 'connect.cassandra.username',
          value: '',
          label: 'Username',
          tooltip: 'Username to connect to Cassandra with if connect.cassandra.authentication.mode is set to username_password.',
          type: 'text',
          placeholder: 'cassandra',
          required: false,
          flex: "33"
         },

         {
          key: 'connect.cassandra.password',
          value: '',
          label: 'Password',
          tooltip: 'Password to connect to Cassandra with if connect.cassandra.authentication.mode is set to username_password.',
          type: 'password',
          placeholder: 'cassandra',
          required: false,
          flex: "33"
         }
        ]
       }


      ] //end of sections
    }
   ] //end o
 }, {
  name: "influxDB",
  icon: "influxdb.jpg",
  description: "The InfluxDB sink connector allows you to write data from a Kafka topic into a influxDB table.",
  class: "com.datamountaineer.streamreactor.connect.influx.InfluxSinkConnector",
  uiEnabled: true,
  type: "Sink",
  color: "#0090BA",
  template: [{
     step: "Basic Info",
     id: "step1",
     sections: [{
       section: "Basic connector information",
       elements: [{
        key: 'name',
        value: 'influxdb',
        label: 'Connector Name',
        tooltip: ' The (unique) connector name',
        type: 'text',
        placeholder: 'ie.influxDB',
        required: true,
        flex: "100",
        errorMessage: "Connector Name is required field and must be unique"
       }, {
        key: 'topics',
        value: 'kafka-topic',
        element: 'input',
        label: 'Topic',
        tooltip: 'The Kafka topics to write to',
        type: 'text',
        placeholder: 'ie.order-topics',
        required: true,
        flex: "50",
        errorMessage: "You need to select an existing topic"
       }, {
        key: 'tasks.max',
        value: 1,
        element: 'input',
        label: 'Max Tasks',
        tooltip: 'The number of tasks the connector is allowed to start (max is 5)',
        type: 'number',
        max: 5,
        min: 1,
        required: true,
        flex: "50",
        errorMessage: "Max 5 tasks"
       }, {
        key: 'connector.class',
        value: 'com.datamountaineer.streamreactor.connect.influx.InfluxSinkConnector',
        type: 'hidden',
        required: true,
        flex: "100"
       }]
      }] //end of sections
    }, //end of step
    {
     step: "Advanced Options",
     id: "step2",
     sections: [{
        section: "Kafka-Connect Query Language (KCQL)",
        elements: [{
         key: 'connect.influx.sink.route.query',
         value: 'INSERT INTO TABLE1 SELECT * FROM TOPIC1;INSERT INTO TABLE2 SELECT field1,field2, field3 as renamedField FROM TOPIC2',
         label: 'KCQL',
         tooltip: 'KCQL expression describing field selection and routes.',
         type: 'text',
         placeholder: 'SELECT * from TOPIC',
         required: true,
         flex: "100"
        }]
       }, {

        section: "Influx Configuration",
        elements: [{
         key: 'connect.influx.connection.url',
         value: 'localhost',
         label: 'Database Host',
         tooltip: 'The InfluxDB database url.',
         type: 'text',
         placeholder: 'localhost',
         required: true,
         flex: "50"
        }, {
         key: 'connect.influx.connection.database',
         value: 'database',
         label: 'Database name',
         tooltip: 'The InfluxDB database.',
         type: 'text',
         placeholder: 'localhost',
         required: true,
         flex: "50"
        }, {
         key: 'connect.influx.connection.user',
         value: '',
         label: 'Username',
         tooltip: 'The user to connect to the influx databas',
         type: 'text',
         placeholder: 'influxdb',
         required: false,
         flex: "50"
        }, {
         key: 'connect.influx.connection.password',
         value: '',
         label: 'Password',
         tooltip: 'The password for the influxdb user.',
         type: 'password',
         placeholder: 'influxdb',
         required: false,
         flex: "50"
        }, {
         key: 'connect.influx.error.policy',
         value: 'THROW',
         label: 'Error policy',
         tooltip: 'There are three available options, NOOP, the error is swallowed, THROW, the error is allowed to propagate and RETRY. For retry the Kafka message is redelivered up to a maximum number of times specified by the connect.influx.max.retires option. The connect.influx.retry.interval option specifies the interval between retries.',
         type: 'text',
         placeholder: 'noop, throw or retry',
         required: false,
         flex: "100"
        }, {
         key: 'connect.influx.max.retires',
         value: 20,
         label: 'Error policy',
         tooltip: 'The maximum number of times a message is retried. Only valid when the Error policy is set to retry.',
         type: 'number',
         placeholder: '20',
         required: false,
         flex: "50"
        }, {
         key: 'connect.influx.retry.interval',
         value: 60000,
         label: 'Error policy',
         tooltip: 'The interval, in milliseconds between retries if the sink is using Error policy set to RETRY.',
         type: 'number',
         placeholder: '60000',
         required: false,
         flex: "50"
        }]
       }


      ] //end of sections
    }
   ] //end o
 }, {
  name: "cassandra",
  icon: "cassandra.jpg",
  description: "The Cassandra source connector allows you to extract entries from Cassandra with the CQL driver and write them into a Kafka topic",
  class: "com.datamountaineer.streamreactor.connect.cassandra.source.CassandraSourceConnector",
  uiEnabled: true,
  type: "Source",
  color: "",
  template: [{
     step: "Basic Info",
     id: "step1",
     sections: [{
       section: "Basic connector information",
       elements: [{
        key: 'name',
        value: 'cassandra-source-orders',
        label: 'Connector Name',
        tooltip: ' The (unique) connector name',
        type: 'text',
        placeholder: 'ie.cassandra-source-orders',
        required: true,
        flex: "100",
        errorMessage: "Connector Name is required field and must be unique"
       }, {
        key: 'connect.cassandra.import.mode',
        value: 'incremental',
        element: 'input',
        label: 'Import mode',
        tooltip: 'The import mode, either incremental or bulk.',
        type: 'text',
        placeholder: 'ie.kafka-connect-logs',
        required: true,
        flex: "50",
        errorMessage: "You need to select an existing topic"
       }, {
        key: 'tasks.max',
        value: 1,
        element: 'input',
        label: 'Max Tasks',
        tooltip: 'The number of tasks the connector is allowed to start (max is 5)',
        type: 'number',
        max: 5,
        min: 1,
        required: true,
        flex: "50",
        errorMessage: "Max 5 tasks"
       }, {
        key: 'connector.class',
        value: 'com.datamountaineer.streamreactor.connect.cassandra.source.CassandraSourceConnector',
        type: 'hidden',
        required: true,
        flex: "100"
       }]
      }] //end of sections
    }, //end of step
    {
     step: "Advanced Options",
     id: "step2",
     sections: [{
        section: "Kafka-Connect Query Language (KCQL)",
        elements: [{
         key: 'connect.cassandra.import.route.query',
         value: 'INSERT INTO TOPIC1 SELECT * FROM TOPIC1 PK myTimeUUICol',
         label: 'KCQL',
         tooltip: 'Kafka connect query language expression. Allows for expressive table to topic routing, field selection and renaming. In incremental mode the timestampColumn can be specified by PK colName.',
         type: 'text',
         placeholder: 'INSERT INTO TOPIC1 SELECT * FROM TOPIC1 PK myTimeUUICol',
         required: true,
         flex: "100"
        }, {
         key: 'connect.cassandra.source.task.fetch.size',
         value: 1000,
         label: 'Fetch size',
         tooltip: 'The fetch size for the Cassandra driver to read.',
         type: 'number',
         placeholder: '1000',
         required: false,
         flex: "33"
        }, {
         key: 'connect.cassandra.source.task.buffer.size',
         value: 1000,
         label: 'Buffer size',
         tooltip: 'The size of the queue for buffering resultset records before write to Kafka.',
         type: 'number',
         placeholder: '1000',
         required: false,
         flex: "33"
        }, {
         key: 'connect.cassandra.source.batch.policy',
         value: 1000,
         label: 'Batch size',
         tooltip: 'The number of records the source task should drain from the reader queue.',
         type: 'number',
         placeholder: '1000',
         required: false,
         flex: "33"
        }, {
         key: 'connect.cassandra.source.error.policy',
         value: 'throw',
         label: 'Error policy',
         tooltip: 'There are three available options, noop, the error is swallowed, throw, the error is allowed to propagate and retry. For retry the Kafka message is redelivered up to a maximum number of times specified by the connect.cassandra.source.max.retries option. The connect.cassandra.sink.retry.interval option specifies the interval between retries.',
         type: 'text',
         placeholder: 'noop, throw or retry',
         required: false,
         flex: "100"
        }, {
         key: 'connect.cassandra.source.max.retries',
         value: 10,
         label: 'Error policy',
         tooltip: 'The maximum number of times a message is retried. Only valid when the connect.cassandra.source.error.policy is set to retry.',
         type: 'number',
         placeholder: 'connect.cassandra.import.route.query',
         required: false,
         flex: "50"
        }, {
         key: 'connect.cassandra.source.retry.interval',
         value: 60000,
         label: 'Error policy',
         tooltip: 'The interval, in milliseconds between retries if the sink is using connect.cassandra.source.error.policy set to RETRY.',
         type: 'number',
         placeholder: '60000',
         required: false,
         flex: "50"
        }]
       }, {

        section: "Cassandra Configuration",
        elements: [{
          key: 'connect.cassandra.contact.points',
          value: 'localhost',
          label: 'Cassandra Host',
          tooltip: 'The ip or host name of the nodes in the Cassandra cluster to connect to.',
          type: 'text',
          placeholder: 'localhost',
          required: true,
          flex: "50"
         },

         {
          key: 'connect.cassandra.port',
          value: 9042,
          label: 'Cassandra port',
          tooltip: '',
          type: 'number',
          placeholder: '9042',
          max: 100000,
          min: 1,
          required: false,
          flex: "50"
         },

         {
          key: 'connect.cassandra.key.space',
          value: 'demo',
          label: 'Cassandra Key Space',
          tooltip: 'The keyspace (demo) we are connecting to.',
          type: 'text',
          placeholder: 'demo',
          required: false,
          flex: "33"
         },

         {
          key: 'connect.cassandra.username',
          value: '',
          label: 'Username',
          tooltip: 'Username to connect to Cassandra with if connect.cassandra.authentication.mode is set to username_password.',
          type: 'text',
          placeholder: 'cassandra',
          required: false,
          flex: "33"
         },

         {
          key: 'connect.cassandra.password',
          value: '',
          label: 'Cassandra port',
          tooltip: 'Password to connect to Cassandra with if connect.cassandra.authentication.mode is set to username_password.',
          type: 'password',
          placeholder: 'cassandra',
          required: false,
          flex: "33"
         }
        ]
       }


      ] //end of sections
    }
   ] //end o
 }, {
  name: "elastic", //TODO rename elasticsearch
  color: "#5CB85C",
  icon: "elastic.png",
  description: "A Connector and Sink to write events from Kafka to Elastic Search using Elastic4s client.",
  type: "Sink",
  uiEnabled: true,
  class: "com.datamountaineer.streamreactor.connect.elastic.ElasticSinkConnector",
  template: [{
     step: "Basic Info",
     id: "step1",
     sections: [{
       section: "Basic connector information",
       elements: [{
        key: 'name',
        value: 'sink-to-elastic',
        label: 'Connector Name',
        tooltip: ' The (unique) connector name',
        type: 'text',
        placeholder: 'ie.sink-to-elastic',
        required: true,
        flex: "100",
        errorMessage: "Connector Name is required field and must be unique"
       }, {
        key: 'topic',
        value: 'kafka-connect-logs',
        element: 'input',
        label: 'Topic',
        tooltip: 'The Kafka topic to read from',
        type: 'text',
        placeholder: 'ie.kafka-connect-logs',
        required: true,
        flex: "50",
        errorMessage: "You need to select an existing topic"
       }, {
        key: 'tasks.max',
        value: 1,
        element: 'input',
        label: 'Max Tasks',
        tooltip: 'The number of tasks the connector is allowed to start (max is 5)',
        type: 'number',
        max: 5,
        min: 1,
        required: true,
        flex: 50,
        errorMessage: "Max 5 tasks"
       }, {
        key: 'connector.class',
        value: 'com.datamountaineer.streamreactor.connect.elastic.ElasticSinkConnector',
        type: 'hidden',
        required: true,
        flex: "100"
       }]
      }] //end of sections
    }, //end of step
    {
     step: "Advanced Options",
     id: "step2",
     sections: [{
        section: "Kafka-Connect Query Language (KCQL)",
        elements: [{
         key: 'connect.elastic.export.route.query',
         value: 'SELECT * from TOPIC',
         label: 'KCQL',
         tooltip: '',
         type: 'text',
         placeholder: 'SELECT * from TOPIC',
         required: false,
         flex: "100"
        }]
       },

       {
        section: "Elastic Search Configuration",
        elements: [{
         key: 'connect.elastic.url',
         value: 'localhost',
         label: 'Elastic Url and port',
         tooltip: 'i.e: http://localhost:8085',
         type: 'text',
         placeholder: 'http://localhost:8085',
         errorMessage: "Elastic url",
         required: true,
         flex: "50"
        }, {
         key: 'connect.elastic.url.prefix',
         value: 'elasticsearch',
         label: 'Elastic Prefix',
         tooltip: 'The elastic prefix',
         type: 'text',
         placeholder: 'elasticsearch',
         required: false,
         flex: "50",
         errorMessage: "Elastic prefix is required"
        }, {
         key: 'connect.elastic.cluster.name',
         value: 'elasticsearch',
         label: 'Elastic Cluster Name',
         tooltip: 'The elastic cluster name',
         type: 'text',
         placeholder: 'elasticsearch',
         required: false,
         flex: "50",
         errorMessage: "Elastic cluster name is required"
        }]
       }


      ] //end of sections
    }
   ] //end o
 }, {
  name: "hbase",
  icon: "hbase.svg",
  type: "Sink",
  description: "The HBase sink connector allows you to write data from a Kafka topic into HBase",
  uiEnabled: true,
  color: "#6d1c7c",
  class: "com.datamountaineer.streamreactor.connect.hbase.HbaseSinkConnector",
  template: [{
    step: "Basic Info",
    id: "step1",
    sections: [{
      section: "Basic connector information",
      elements: [{
        key: 'name',
        value: 'sink-to-hbase',
        label: 'Connector Name',
        tooltip: ' The (unique) connector name',
        type: 'text',
        placeholder: 'ie.sink-to-hbase',
        required: true,
        flex: "100",
        errorMessage: "Connector Name is required field and must be unique"
       }, {
        key: 'topics',
        value: 'kafka-connect-logs',
        element: 'input',
        label: 'Topic',
        tooltip: 'The source kafka topics to take events from.',
        type: 'text',
        placeholder: 'ie.kafka-connect-logs',
        required: true,
        flex: "50",
        errorMessage: "You need to select an existing topic"
       }, {
        key: 'tasks.max',
        value: 1,
        element: 'input',
        label: 'Max Tasks',
        tooltip: 'The number of tasks the connector is allowed to start (max is 5)',
        type: 'number',
        max: 5,
        min: 1,
        required: true,
        flex: 50,
        errorMessage: "Max 5 tasks"
       }, {
        key: 'connector.class',
        value: 'com.datamountaineer.streamreactor.connect.hbase.HbaseSinkConnector',
        type: 'hidden',
        required: true,
        flex: "100"
       }

      ]
     }] //end of sections
   }, {
    step: "Advanced Options",
    id: "step2",
    sections: [{
      section: "HBase configuration",
      elements: [{
       key: 'connect.hbase.sink.column.family',
       value: 'id',
       label: 'The HBase column family to write to',
       tooltip: '',
       type: 'text',
       placeholder: 'SELECT * from TOPIC',
       required: false,
       flex: "100"
      }]
     }, {
      section: "Kafka-Connect Query Language (KCQL)",
      elements: [{
       key: 'connect.hbase.export.route.query',
       value: 'INSERT INTO person_hbase SELECT * FROM TOPIC1',
       label: 'KCQL',
       tooltip: '',
       type: 'text',
       placeholder: 'INSERT INTO person_hbase SELECT * FROM TOPIC1',
       errorMessage: "KCQL is required",
       required: true,
       flex: "100"
      }]
     }] //end of sections
   }] //end o
 }, {
  name: "redis",
  icon: 'redis.png',
  description: 'The Redis sink connector allows you to write data from a Kafka topic into Redis',
  type: "Sink",
  uiEnabled: true,
  color: "#D8291F",
  class: "com.datamountaineer.streamreactor.connect.redis.sink.RedisSinkConnector",
  template: [{
     step: "Basic Info",
     id: "step1",
     sections: [{
       section: "Basic connector information",
       elements: [{
         key: 'name',
         value: 'redis-connector',
         label: 'Connector Name',
         tooltip: ' The (unique) connector name',
         type: 'text',
         placeholder: 'ie.redis-connector',
         required: true,
         flex: "100",
         errorMessage: "Connector Name is required field and must be unique"
        }, {
         key: 'topics',
         value: 'kafka-connect-logs',
         element: 'input',
         label: 'Topic',
         tooltip: 'The Kafka topic to read from',
         type: 'text',
         placeholder: 'ie.kafka-connect-logs',
         required: true,
         flex: "50",
         errorMessage: "You need to select an existing topic"
        }, {
         key: 'tasks.max',
         value: 1,
         element: 'input',
         label: 'Max Tasks',
         tooltip: 'The number of tasks the connector is allowed to start (max is 5)',
         type: 'number',
         max: 5,
         min: 1,
         required: true,
         flex: 50,
         errorMessage: "Max 5 tasks"
        }, {
         key: 'connector.class',
         value: 'com.datamountaineer.streamreactor.connect.redis.sink.RedisSinkConnector',
         type: 'hidden',
         required: true,
         flex: "100"
        }

       ]
      }] //end of sections
    }, //end of step
    {
     step: "Advanced Options",
     id: "step2",
     sections: [{
        section: "Kafka-Connect Query Language (KCQL)",
        elements: [{
         key: 'connect.redis.export.route.query',
         value: 'SELECT * from kafka-connect-logs  WITHFORMAT avro',
         label: 'KCQL',
         tooltip: '',
         type: 'text',
         placeholder: 'SELECT * from kafka-connect-logs WITHFORMAT avro',
         required: false,
         flex: "100"
        }]
       },

       {
        section: "Redis configuration",
        elements: [{
         key: 'connect.redis.connection.password',
         value: 'password',
         label: 'Redis Password',
         tooltip: '',
         type: 'password',
         placeholder: 'Type your Redis password',
         errorMessage: "Redis password is required",
         required: false,
         flex: "100"
        }, {
         key: 'connect.redis.connection.host',
         value: 'localhost',
         label: 'Redis Hostname',
         tooltip: 'Host ip',
         type: 'text',
         placeholder: 'localhost',
         required: false,
         flex: "50",
         errorMessage: "Host ip is required"
        }, {
         key: 'connect.redis.connection.port',
         value: 36379,
         label: 'Redis Port',
         tooltip: '',
         type: 'number',
         min: 1,
         max: 100000,
         step: 10,
         placeholder: '',
         required: false,
         flex: "50"
        }]
       }


      ] //end of sections
    }
   ] //end o
 }, {
  name: "kudu",
  icon: 'kudu.png',
  type: "Sink",
  description: "The Kudu sink connector allows you to write data from a Kafka topic into Kudu. Kudu 0.9 or newer",
  uiEnabled: true,
  color: "#549998",
  class: "com.datamountaineer.streamreactor.connect.kudu.sink.KuduSinkConnector",
  template: [{
     step: "Basic Info",
     id: "step1",
     sections: [{
       section: "Basic connector information",
       elements: [{
         key: 'name',
         value: 'kudu-connector',
         label: 'Connector Name',
         tooltip: ' The (unique) connector name',
         type: 'text',
         placeholder: 'ie.kudu-connector',
         required: true,
         flex: "100",
         errorMessage: "Connector Name is required field and must be unique"
        }, {
         key: 'topic',
         value: 'kafka-connect-logs',
         element: 'input',
         label: 'Topic',
         tooltip: 'The source kafka topics to take events from.',
         type: 'text',
         placeholder: 'ie.kafka-connect-logs',
         required: true,
         flex: "50",
         errorMessage: "You need to select an existing topic"
        }, {
         key: 'tasks.max',
         value: 1,
         element: 'input',
         label: 'Max Tasks',
         tooltip: 'The number of tasks the connector is allowed to start (max is 5)',
         type: 'number',
         max: 5,
         min: 1,
         required: true,
         flex: 50,
         errorMessage: "Max 5 tasks"
        }, {
         key: 'connector.class',
         value: 'com.datamountaineer.streamreactor.connect.kudu.sink.KuduSinkConnector',
         type: 'hidden',
         required: true,
         flex: "100"
        }

       ]
      }] //end of sections
    }, //end of step
    {
     step: "Advanced Options",
     id: "step2",
     sections: [{
        section: "Kafka-Connect Query Language (KCQL)",
        elements: [{
         key: 'connect.kudu.export.route.query',
         value: 'INSERT INTO TABLE2 SELECT field1, field2, field3 as renamedField FROM TOPIC2',
         label: 'KCQL',
         tooltip: '',
         type: 'text',
         placeholder: 'SELECT * from kafka-connect-logs WITHFORMAT avro',
         required: false,
         flex: "100"
        }]
       },

       {
        section: "Kudu configuration",
        elements: [{
         key: 'connect.kudu.master',
         value: 'quickstart',
         label: 'Master Server',
         tooltip: '',
         type: 'text',
         placeholder: 'Kudu master server',
         errorMessage: "Kudu master server is required",
         required: false,
         flex: "33"
        }, {
         key: 'connect.kudu.sink.schema.registry.url',
         value: 'localhost',
         label: 'The schema registry url',
         tooltip: 'Host ip',
         type: 'text',
         placeholder: 'localhost',
         required: false,
         flex: "33",
         errorMessage: "A valid url is required"
        }, {
         key: 'connect.kudu.sink.error.policy',
         value: 'noop',
         label: 'Error policy',
         tooltip: 'noop - Errors are ignored. throw - Errors are allowed to propagate. retry -  the Kafka message is redelivered up to a maximum number of times specified by the connect.kudu.sink.max.retries option. The connect.kudu.sink.retry.interval',
         type: 'text',
         placeholder: '',
         required: false,
         flex: "33"
        }]
       }


      ] //end of sections
    }
   ] //end o
 }, {
  name: "jms",
  type: "Sink",
  icon: "logo-jms.png",
  description: "The JMS sink connector allows you to extract entries from a Kafka topic with the CQL driver and pass them to a JMS topic/queue.",
  uiEnabled: true,
  color: "#879171",
  class: "com.datamountaineer.streamreactor.connect.jms.sink.JMSSinkConnector",
  template: [{
     step: "Basic Info",
     id: "step1",
     sections: [{
       section: "Basic connector information",
       elements: [{
         key: 'name',
         value: 'jms-sink',
         label: 'Connector Name',
         tooltip: ' The (unique) connector name',
         type: 'text',
         placeholder: 'ie.jms-connector',
         required: true,
         flex: "100",
         errorMessage: "Connector Name is required field and must be unique"
        }, {
         key: 'topics',
         value: 'person_jms',
         element: 'input',
         label: 'Topic',
         tooltip: 'The source kafka topics to take events from.',
         type: 'text',
         placeholder: 'ie.kafka-connect-logs',
         required: true,
         flex: "50",
         errorMessage: "You need to select an existing topic"
        }, {
         key: 'tasks.max',
         value: 1,
         element: 'input',
         label: 'Max Tasks',
         tooltip: 'The number of tasks the connector is allowed to start (max is 5)',
         type: 'number',
         max: 5,
         min: 1,
         required: true,
         flex: 50,
         errorMessage: "Max 5 tasks"
        }, {
         key: 'connector.class',
         value: 'com.datamountaineer.streamreactor.connect.jms.sink.JMSSinkConnector',
         type: 'hidden',
         required: true,
         flex: "100"
        }

       ]
      }] //end of sections
    }, //end of step
    {
     step: "Advanced Options",
     id: "step2",
     sections: [{
        section: "Kafka-Connect Query Language (KCQL)",
        elements: [{
         key: 'connect.jms.sink.export.route.query',
         value: 'INSERT INTO topic_1 SELECT * FROM person_jms',
         label: 'KCQL',
         tooltip: '',
         type: 'text',
         placeholder: 'INSERT INTO topic_1 SELECT * FROM person_jms',
         required: true,
         flex: "100"
        }, {
         key: 'connect.jms.sink.connection.factory',
         value: 'org.apache.activemq.ActiveMQConnectionFactory',
         label: 'Connection Factory',
         tooltip: '',
         type: 'text',
         placeholder: 'org.apache.activemq.ActiveMQConnectionFactory',
         required: true,
         flex: "50"
        }, {
         key: 'connect.jms.sink.url',
         value: 'tcp://localhost:61616',
         label: 'Sink Url',
         tooltip: '',
         type: 'text',
         placeholder: 'tcp://localhost:61616',
         required: true,
         flex: "50"
        }]
       },

       {
        section: "JMS configuration",
        elements: [{
         key: 'connect.jms.sink.message.type',
         value: 'AVRO',
         label: 'Message Type',
         tooltip: '',
         type: 'text',
         placeholder: 'AVRO',
         errorMessage: "Kudu master server is required",
         required: false,
         flex: "50"
        }, {
         key: 'connect.jms.error.policy',
         value: 'THROW',
         label: 'Error Policy',
         tooltip: '',
         type: 'text',
         placeholder: 'THROW',
         required: false,
         flex: "50",
         errorMessage: ""
        }, {
         key: 'connect.jms.sink.export.route.topics',
         value: 'topic_1',
         label: 'Export Route Topics',
         tooltip: '',
         type: 'text',
         placeholder: '',
         required: false,
         flex: "50"
        }, {
         key: 'connect.jms.sink.export.route.queue',
         value: 'queue1,queue2,etc',
         label: 'JMS Lists',
         tooltip: 'Lists all the jms target queues, (comma separated strings)',
         type: 'text',
         placeholder: 'queue1,queue2,etc',
         required: false,
         flex: "50"
        }]
       }

      ] //end of sections
    }
   ] //end of template
 }, {
  name: "yahoo",
  type: "Source",
  icon: "yahoofinance.png",
  description: "Subscribe to Yahoo Finance API and stream data into a kafka topic",
  uiEnabled: true,
  color: "#30007b",
  class: "com.datamountaineer.streamreactor.connect.yahoo.source.YahooSourceConnector",
  template: [{
    step: "Basic Info",
    id: "step1",
    sections: [{
      section: "Basic connector information",
      elements: [{
       key: 'name',
       value: 'yahoo-finance-source',
       label: 'Connector Name',
       tooltip: ' The (unique) connector name',
       type: 'text',
       placeholder: 'ie.yahoo-finance-source',
       required: true,
       flex: 50,
       errorMessage: "Connector Name is required field and must be unique"
      }, {
       key: 'tasks.max',
       value: 1,
       element: 'input',
       label: 'Max Tasks',
       tooltip: 'The number of tasks the connector is allowed to start (max is 5)',
       type: 'number',
       max: 5,
       min: 1,
       required: true,
       flex: 50,
       errorMessage: "Max tasks should be between blah blah"
      }, {
       key: 'connector.class',
       value: 'com.datamountaineer.streamreactor.connect.yahoo.source.YahooSourceConnector',
       type: 'hidden',
       required: true,
       flex: "100"
      }]
     }, {
      section: "Fetch FX",
      elements: [{
       key: 'connect.yahoo.source.fx.subscriptions',
       value: 'USDGBP=X,USDGBP=X,EURGBP=X',
       element: 'input',
       label: 'FX (foreign exchange) values',
       tooltip: 'comma-separated Fx values to get from Yahoo Finance API',
       type: 'text',
       placeholder: 'ie.USDGBP=X,USDGBP=X,EURGBP=X',
       required: true,
       flex: "50",
       errorMessage: "FX (foreign exchange) values is required field"
      }, {
       key: 'connect.yahoo.source.fx.topic',
       value: 'yahoo-fx',
       element: 'input',
       label: 'Topic to write FX data to',
       tooltip: 'Topic to write FX data to',
       type: 'text',
       placeholder: 'ie.yahoo-fx',
       required: true,
       flex: "50",
       errorMessage: "Topic is required field"
      }, ]
     }, {
      section: "Fetch Stocks",
      elements: [{
       key: 'connect.yahoo.source.stocks.subscriptions',
       value: 'GOOGL,MSFT,AAPL',
       element: 'input',
       label: 'Financial stocks to get from Yahoo Finance API',
       tooltip: 'comma-separated financial stocks to get from Yahoo Finance API',
       type: 'text',
       placeholder: 'ie.GOOGL,MSFT,AAPL',
       required: true,
       flex: "50",
       errorMessage: "Financial stocks to get from Yahoo Finance API is required field"
      }, {
       key: 'connect.yahoo.source.stocks.topic',
       value: 'yahoo-stocks',
       element: 'input',
       label: 'Topic to write STOCK data to',
       tooltip: 'Topic to write STOCK data to',
       type: 'text',
       placeholder: 'ie.yahoo-stocks',
       required: true,
       flex: "50",
       errorMessage: "Topic is required field"
      }, ]
     }] //end of sections
   }, //end of step
   {
    step: "Advanced configuration",
    id: "step2",
    sections: [{
      section: "Advanced configuration",
      elements: [{
       key: 'connect.yahoo.source.poll.interval',
       value: 20000,
       label: 'How often to polls Yahoo services for new data',
       tooltip: 'Default value is 20 secibds as the API limit is 2.000 requests / hour',
       type: 'number',
       min: 3000,
       max: 100000,
       placeholder: '2000',
       required: false,
       flex: "100"
      }, {
       key: 'connect.yahoo.source.error.policy',
       value: 'THROW',
       label: 'Output format',
       tooltip: 'Sets the error handling aproach, available options are THROW and NOOP',
       type: 'text',
       placeholder: 'THROW',
       required: false,
       flex: "100"
      }]
     }] //end of sections
   }
  ]
 }, {
  name: "hdfs",
  type: "Sink",
  description: "The HDFS sink connector allows you to write data from a Kafka topic into HDFS",
  icon: "hdfs.png",
  uiEnabled: true,
  color: "#ffcccc",
  class: "io.confluent.connect.hdfs.HdfsSinkConnector",
  template: [{
    step: "Basic Info",
    id: "step1",
    sections: [{
      section: "Basic connector information",
      elements: [{
        key: 'name',
        value: 'sink-to-hdfs',
        label: 'Connector Name',
        tooltip: ' The (unique) connector name',
        type: 'text',
        placeholder: 'ie.sink-to-hdfs',
        required: true,
        flex: "100",
        errorMessage: "Connector Name is required field and must be unique"
       }, {
        key: 'topics',
        value: 'kafka-connect-logs',
        element: 'input',
        label: 'Topics',
        tooltip: 'The Kafka topics to read from',
        type: 'text',
        placeholder: 'ie.kafka-connect-logs',
        required: true,
        flex: "50",
        errorMessage: "You need to select an existing topic"
       }, {
        key: 'tasks.max',
        value: 1,
        element: 'input',
        label: 'Max Tasks',
        tooltip: 'The number of tasks the connector is allowed to start (max is 5)',
        type: 'number',
        max: 5,
        min: 1,
        required: true,
        flex: 50,
        errorMessage: "Max 5 tasks"
       }, {
        key: 'hdfs.url',
        value: 'localhost/tmp/',
        element: 'input',
        label: 'Hdfs Url',
        tooltip: '',
        type: 'text',
        required: true,
        flex: 100,
        errorMessage: "Hdfs url is required"
       }, {
        key: 'connector.class',
        value: 'io.confluent.connect.hdfs.HdfsSinkConnector',
        type: 'hidden',
        required: true,
        flex: "100"
       }

      ]
     }] //end of sections
   }, //end of step
   {
    step: "Advanced Options",
    id: "step2",
    sections: [{
       section: "Advanced Configuration",
       elements: [{
        key: 'hadoop.conf.dir',
        value: '/etc/hadoop/conf',
        label: 'Hdfs configuration dir',
        tooltip: 'Directory with HDFS configuration files',
        type: 'text',
        placeholder: '/etc/hadoop/conf',
        required: false,
        flex: "50"
       }, {
        key: 'flush.size',
        value: 3,
        label: 'Number of records before commits',
        tooltip: 'number of records the connector need to write before invoking file commits',
        type: 'number',
        max: 1000000,
        min: 1,
        placeholder: '/etc/hadoop/conf',
        required: false,
        flex: "50"
       }]
      },

      {
       section: "Kerberos - Security configuration",
       elements: [{
        key: 'kerberos.conf.dir',
        value: '/etc/hadoop/conf',
        label: 'Hdfs configuration dir',
        tooltip: '',
        type: 'text',
        placeholder: '/etc/hadoop/conf',
        errorMessage: "Directory with HDFS configuration files",
        required: false,
        flex: "50"
       }, {
        key: 'kerberos.flush.size',
        value: 3,
        label: 'Number of records before commits',
        tooltip: 'number of records the connector need to write before invoking file commits',
        type: 'number',
        max: 1000000,
        min: 1,
        placeholder: '/etc/hadoop/conf',
        required: false,
        flex: "50"
       }]
      }


     ] //end of sections
   }
  ]
 }, {
  name: "Rethink",
  type: "Sink",
  icon: "rethink.png",
  description: "A Connector and Sink to write events from Kafka to RethinkDb.",
  uiEnabled: true,
  color: "#28684b",
  class: "com.datamountaineer.streamreactor.connect.rethink.sink.ReThinkSinkConnector",
  template: [{
    step: "Basic Info",
    id: "step1",
    sections: [{
      section: "Basic connector information",
      elements: [{
        key: 'name',
        value: 'sink-to-rethink',
        label: 'Connector Name',
        tooltip: ' The (unique) connector name',
        type: 'text',
        placeholder: 'ie.sink-to-rethink',
        required: true,
        flex: "100",
        errorMessage: "Connector Name is required field and must be unique"
       }, {
        key: 'topics',
        value: 'kafka-connect-logs',
        element: 'input',
        label: 'Topics',
        tooltip: 'The source kafka topics to take events from.',
        type: 'text',
        placeholder: 'ie.kafka-connect-logs',
        required: true,
        flex: "50",
        errorMessage: "You need to select an existing topic"
       }, {
        key: 'tasks.max',
        value: 1,
        element: 'input',
        label: 'Max Tasks',
        tooltip: 'The number of tasks the connector is allowed to start (max is 5)',
        type: 'number',
        max: 5,
        min: 1,
        required: true,
        flex: 50,
        errorMessage: "Max 5 tasks"
       }, {
        key: 'connector.class',
        value: 'com.datamountaineer.streamreactor.connect.rethink.sink.ReThinkSinkConnector',
        type: 'hidden',
        required: true,
        flex: "100"
       }

      ]
     }] //end of sections
   }, //end of step
   {
    step: "Advanced Options",
    id: "step2",
    sections: [{
       section: "Advanced Configuration",
       elements: [{
        key: 'connect.rethink.sink.db',
        value: 'localhost',
        label: 'Rethink sink DB',
        tooltip: 'The database to sink from',
        type: 'text',
        placeholder: 'localhost',
        required: false,
        flex: "50"
       }, {
        key: 'connect.rethink.sink.port',
        value: 28015,
        label: 'Sink port',
        tooltip: '',
        type: 'number',
        max: 1000000,
        min: 1,
        placeholder: '28015',
        required: false,
        flex: "50"
       }]
      },

      {
       section: "Connector Configuration",
       elements: [{
        key: 'connect.rethink.export.route.query',
        value: 'INSERT INTO TABLE1 SELECT * FROM person_rethink',
        label: 'KCQL',
        tooltip: '',
        type: 'text',
        placeholder: 'INSERT INTO TABLE1 SELECT * FROM person_rethink',
        errorMessage: "KCQL required",
        required: false,
        flex: "100"
       }]
      }


     ] //end of sections
   }
  ]
 }, {
  name: "VoltDB",
  type: "Sink",
  icon: "voltdb.png",
  uiEnabled: true,
  description: 'A Connector and Sink to write events from Kafka to VoltDB. ',
  color: "#e8371b",
  class: "com.datamountaineer.streamreactor.connect.voltdb.VoltSinkConnector",
  template: [{
    step: "Basic Info",
    id: "step1",
    sections: [{
      section: "Basic connector information",
      elements: [{
        key: 'name',
        value: 'voltdb-sink',
        label: 'Connector Name',
        tooltip: ' The (unique) connector name',
        type: 'text',
        placeholder: 'ie.sink-to-voltdb',
        required: true,
        flex: "100",
        errorMessage: "Connector Name is required field and must be unique"
       }, {
        key: 'topics',
        value: 'kafka-connect-logs',
        element: 'input',
        label: 'Topic',
        tooltip: 'The Kafka topic to read from',
        type: 'text',
        placeholder: 'ie.kafka-connect-logs',
        required: true,
        flex: "50",
        errorMessage: "You need to select an existing topic"
       }, {
        key: 'tasks.max',
        value: 1,
        element: 'input',
        label: 'Max Tasks',
        tooltip: 'The number of tasks the connector is allowed to start (max is 5)',
        type: 'number',
        max: 5,
        min: 1,
        required: true,
        flex: 50,
        errorMessage: "Max 5 tasks"
       }, {
        key: 'connector.class',
        value: 'com.datamountaineer.streamreactor.connect.rethink.sink.ReThinkSinkConnector',
        type: 'hidden',
        required: true,
        flex: "100"
       }

      ]
     }] //end of sections
   }, //end of step
   {
    step: "Advanced Options",
    id: "step2",
    sections: [{
       section: "Advanced Configuration",
       elements: [{
        key: 'connect.volt.connection.servers',
        value: 'localhost:21212',
        label: 'voltDB',
        tooltip: 'The name of the voltdb host to connect to.',
        type: 'text',
        placeholder: 'localhost',
        required: true,
        flex: "100"
       }, {
        key: 'connect.volt.connection.user',
        value: 'username',
        label: 'username',
        tooltip: 'Username to connect as',
        type: 'text',
        placeholder: 'username',
        required: false,
        flex: "50"
       }, {
        key: 'connect.volt.connection.password',
        value: 'password',
        label: 'username',
        tooltip: 'The password for the username.',
        type: 'password',
        placeholder: 'password',
        required: false,
        flex: "50"
       }]
      },

      {
       section: "Connector Configuration",
       elements: [{
        key: 'connect.volt.export.route.query',
        value: 'INSERT INTO person SELECT * FROM sink-test',
        label: 'KCQL',
        tooltip: 'The KCQL statement for topic routing and field selection.',
        type: 'text',
        placeholder: 'INSERT INTO TABLE1 SELECT * FROM person_rethink',
        errorMessage: "KCQL required",
        required: false,
        flex: "100"
       }]
      }


     ] //end of sections
   }
  ]
 }, {
  name: "HazelCast",
  type: "Sink",
  description: "Ultra low-latency in memory grid for strict SLAs",
  icon: "hazelcast.png",
  uiEnabled: true,
  color: "#002A36",
  class: "com.datamountaineer.streamreactor.connect.hazelcast.sink.HazelCastSinkConnector",
  template: [{
    step: "Basic Info",
    id: "step1",
    sections: [{
      section: "Basic connector information",
      elements: [{
       key: 'name',
       value: 'hazelcast-sink',
       label: 'Connector Name',
       tooltip: ' The (unique) connector name',
       type: 'text',
       placeholder: 'ie.hazelcast-sink',
       required: true,
       flex: "100",
       errorMessage: "Connector Name is required field and must be unique"
      }, {
       key: 'topics',
       value: 'sink-test',
       element: 'input',
       label: 'Topic',
       tooltip: 'The Kafka topic to read from',
       type: 'text',
       placeholder: 'ie.kafka-connect-logs',
       required: true,
       flex: "50",
       errorMessage: "You need to select an existing topic"
      }, {
       key: 'tasks.max',
       value: 1,
       element: 'input',
       label: 'Max Tasks',
       tooltip: 'The number of tasks the connector is allowed to start (max is 5)',
       type: 'number',
       max: 5,
       min: 1,
       required: true,
       flex: 50,
       errorMessage: "Max 5 tasks"
      }, {
       key: 'connector.class',
       value: 'com.datamountaineer.streamreactor.connect.hazelcast.sink.HazelCastSinkConnector',
       type: 'hidden',
       required: true,
       flex: "100"
      }]
     }] //end of sections
   }, //end of step
   {
    step: "Advanced Options",
    id: "step2",
    sections: [{
       section: "Advanced Configuration",
       elements: [{
        key: 'connect.hazelcast.sink.cluster.members',
        value: 'localhost',
        label: 'HazelCast host',
        tooltip: 'The name of the hazelcast host to connect to.',
        type: 'text',
        placeholder: 'localhost',
        required: true,
        flex: "100"
       }, {
        key: 'connect.hazelcast.sink.group.name',
        value: 'dev',
        label: 'Group name',
        tooltip: 'The name of the group to connect to.',
        type: 'text',
        placeholder: 'Group name',
        required: false,
        flex: "50"
       }, {
        key: 'connect.hazelcast.sink.group.password',
        value: 'dev-pass',
        label: 'Group Password',
        tooltip: 'The password for the group.',
        type: 'dev-pas',
        placeholder: 'password',
        required: false,
        flex: "50"
       }]
      },

      {
       section: "Connector Configuration",
       elements: [{
        key: 'connect.hazelcast.export.route.query',
        value: 'INSERT INTO sink-test SELECT * FROM sink-test WITHFORMAT JSON BATCH 100',
        label: 'KCQL',
        tooltip: 'The KCQL statement to route and map a topic to the Hazelcast reliable topic.',
        type: 'text',
        placeholder: 'INSERT INTO sink-test SELECT * FROM sink-test WITHFORMAT JSON BATCH 100',
        errorMessage: "KCQL required",
        required: false,
        flex: "100"
       }, {
        key: 'connect.hazelcast.sink.error.policy',
        value: 'throw',
        label: 'Error policy',
        tooltip: 'noop - Errors are ignored. throw - Errors are allowed to propagate. retry -  the Kafka message is redelivered up to a maximum number of times specified by the connect.hazelcast.sink.max.retries option. The connect.hazelcast.sink.retry.interval',
        type: 'text',
        placeholder: '',
        required: false,
        flex: "50"
       }, {
        key: 'connect.hazelcast.sink.max.retries',
        value: 10,
        label: 'Max Retries',
        tooltip: 'The maximum number of times a message is retried. Only valid when the connect.hazelcast.sink.error.policy is set to retry.',
        type: 'number',
        placeholder: '10',
        required: false,
        flex: "50"
       }, {
        key: 'connect.hazelcast.sink.retry.interval',
        value: 60000,
        label: 'retry interval',
        tooltip: 'The interval, in milliseconds between retries if the sink is using connect.hazelcast.sink.error.policy set to RETRY.',
        type: 'number',
        placeholder: '60000',
        required: false,
        flex: "50"
       }, {
        key: 'connect.hazelcast.sink.batch.size',
        value: 1000,
        label: 'Branch Size',
        tooltip: 'Specifies how many records to insert together at one time. If the connect framework provides less records when it is calling the sink it won’t wait to fulfill this value but rather execute it.',
        type: 'number',
        placeholder: '1000',
        required: false,
        flex: "50"
       }]
      }



     ] //end of sections
   }
  ]
 },

 {
  name: "file",
  icon: "file.png",
  class: "org.apache.kafka.connect.file.FileStreamSinkConnector",
  description: "Read Kafka Topics and stream data into file",
  type: "Sink",
  uiEnabled: true,
  color: "#b1b1b1",
  template: [{
   step: "Basic Info",
   id: "step1",
   sections: [{
     section: "Basic connector information",
     elements: [{
      key: 'name',
      value: 'quickstart-avro-file-sink',
      label: 'Connector Name',
      tooltip: ' The (unique) connector name',
      type: 'text',
      placeholder: 'ie.quickstart-avro-file-sink',
      required: true,
      flex: "100",
      errorMessage: "Connector Name is required field and must be unique"
     }, {
      key: 'file',
      value: '/tmp/quickstart/jdbc-output.txt',
      element: 'input',
      label: 'File',
      tooltip: 'The source file for the connector',
      type: 'text',
      required: true,
      errorMessage: "Must use a file",
      flex: "100"
     }, {
      key: 'topics',
      value: 'quickstart-jdbc-test',
      element: 'input',
      label: 'Topic',
      tooltip: 'The Kafka topic to read from',
      type: 'text',
      placeholder: 'ie.quickstart-jdbc-test',
      required: true,
      flex: "50",
      errorMessage: "You need to select an existing topic"
     }, {
      key: 'tasks.max',
      value: 1,
      element: 'input',
      label: 'Max Tasks',
      tooltip: 'The number of tasks the connector is allowed to start (max is 5)',
      type: 'number',
      max: 5,
      min: 1,
      required: true,
      flex: 50,
      errorMessage: "Max 5 tasks"
     }, {
      key: 'connector.class',
      value: 'org.apache.kafka.connect.file.FileStreamSinkConnector',
      type: 'hidden',
      required: true,
      flex: "100"
     }]
    }] //end of sections
  }]
 }, {
  name: "jdbc",
  icon: "jdbc.png",
  class: "io.confluent.connect.jdbc.JdbcSourceConnector",
  description: "The jdbc source connector allows you to write data from a Kafka topic into HDFS",
  type: "Source",
  uiEnabled: true,
  color: "#b1b1b1",
  template: [{
   step: "Basic Info",
   id: "step1",
   sections: [{
     section: "Basic connector information",
     elements: [{
      key: 'name',
      value: 'test-sqlite-jdbc-autoincrement',
      label: 'Connector Name',
      tooltip: ' The (unique) connector name',
      type: 'text',
      placeholder: 'ie.test-sqlite-jdbc-autoincrement',
      required: true,
      flex: "100",
      errorMessage: "Connector Name is required field and must be unique"
     }, {
      key: 'connection.url',
      value: 'jdbc:sqlite:test.db',
      element: 'input',
      label: 'File',
      tooltip: 'The connector url',
      type: 'text',
      required: true,
      errorMessage: "Must use an url",
      flex: "50"
     }, {
      key: 'topic.prefix',
      value: 'test-sqlite-jdbc-',
      element: 'input',
      label: 'Topic',
      tooltip: 'The Kafka topic to read from',
      type: 'text',
      placeholder: 'ie.test-sqlite-jdbc-',
      required: true,
      flex: "50",
      errorMessage: "You need to select a topic prefix"
     }, {
      key: 'mode',
      value: 'incrementing',
      element: 'input',
      label: 'Topic',
      tooltip: '',
      type: 'text',
      placeholder: 'ie.incrementing',
      required: true,
      flex: "50"
     }, {
      key: 'incrementing.column.name',
      value: 'id',
      element: 'input',
      label: 'Topic',
      tooltip: '',
      type: 'text',
      placeholder: 'ie.id',
      required: true,
      flex: "50"
     }, {
      key: 'tasks.max',
      value: 1,
      element: 'input',
      label: 'Max Tasks',
      tooltip: 'The number of tasks the connector is allowed to start (max is 5)',
      type: 'number',
      max: 5,
      min: 1,
      required: true,
      flex: 50,
      errorMessage: "Max 5 tasks"
     }, {
      key: 'connector.class',
      value: 'io.confluent.connect.jdbc.JdbcSourceConnector',
      type: 'hidden',
      required: true,
      flex: "100"
     }]
    }] //end of sections
  }]
 },
 {
  name: "mqtt",
  icon: "mqtt.png",
  class: "com.datamountaineer.streamreactor.connect.mqtt.source.MqttSourceConnector",
  description: "The MQTT source connector allows you to read from MQTT and stream data into a kafka topic",
  type: "Source",
  uiEnabled: true,
  color: "#5B346C",
  template: [{
   step: "Basic Info",
   id: "step1",
   sections: [{
     section: "Basic connector information",
     elements: [{
      key: 'name',
      value: 'test-mqtt-source',
      label: 'Connector Name',
      tooltip: ' The (unique) connector name',
      type: 'text',
      placeholder: 'ie.test-mqtt-source',
      required: true,
      flex: "100",
      errorMessage: "Connector Name is required field and must be unique"
     }, {
      key: 'connect.mqtt.hosts',
      value: 'localhost:9595',
      element: 'input',
      label: 'Mqtt connection endpoints',
      tooltip: 'Contains the MQTT connection end points',
      type: 'text',
      required: true,
      errorMessage: "Must use a host",
      flex: "50"
     }, {
      key: 'connect.mqtt.user',
      value: 'Username',
      element: 'input',
      label: 'Username',
      tooltip: 'Contains the Mqtt connection user name',
      type: 'text',
      placeholder: 'i.e.Username',
      required: true,
      flex: "50",
      errorMessage: "You need to select a username"
     }, {
      key: 'connect.mqtt.password',
      value: 'passwrod',
      element: 'input',
      label: 'Password',
      tooltip: 'Contains the Mqtt connection password',
      type: 'password',
      placeholder: 'ie.password',
      required: true,
      flex: "50"
     }, {
      key: 'connect.mqtt.service.quality',
      value: '0',
      element: 'input',
      label: 'Mqtt quality of service',
      tooltip: 'The Quality of Service (QoS) level is an agreement between sender and receiver of a message regarding the guarantees of delivering a message. There are 3 QoS levels in MQTT: 0 = At most once; 1 = At least once; 2 = Exactly once',
      type: 'text',
      placeholder: 'ie.0,1,2',
      required: true,
      flex: "50"
     }, {
      key: 'tasks.max',
      value: 1,
      element: 'input',
      label: 'Max Tasks',
      tooltip: 'The number of tasks the connector is allowed to start (max is 5)',
      type: 'number',
      max: 5,
      min: 1,
      required: true,
      flex: 50,
      errorMessage: "Max 5 tasks"
     }, {
      key: 'connector.class',
      value: "com.datamountaineer.streamreactor.connect.mqtt.source.MqttSourceConnector",
      type: 'hidden',
      required: true,
      flex: "100"
     }]
    }] //end of sections
  },
  {
    step: "Advanced Options",
    id: "step2",
    sections: [{
       section: "Advanced Configuration",
       elements: [{
        key: 'connect.mqtt.client.id',
        value: 'dm_source_id',
        label: 'Client id',
        tooltip: 'Contains the Mqtt session client id.',
        type: 'text',
        placeholder: 'dm_source_id',
        required: true,
        flex: "100"
       }, {
        key: 'connect.mqtt.connection.timeout',
        value: '1000',
        label: 'Connection timeout',
        tooltip: 'Provides the time interval to establish the mqtt connection.',
        type: 'text',
        placeholder: '1000',
        required: false,
        flex: "50"
       }, {
        key: 'connect.mqtt.connection.clean',
        value: 'true',
        label: 'Clean session',
        tooltip: 'true / false',
        placeholder: 'true / false',
        required: false,
        flex: "50"
       },
       {
        key: 'connect.mqtt.source.kcql',
        value: '',
        label: 'KCQL',
        tooltip: 'Contains the Kafka Connect Query Language describing the sourced MQTT source and the target Kafka topics',
        type: 'text',
        placeholder: 'INSERT INTO position-reports SELECT * FROM /ais',
        errorMessage: "KCQL required",
        required: false,
        flex: "100"
       }, {
        key: 'connect.mqtt.connection.keep.alive',
        value: '',
        label: 'Keep alive interval',
        tooltip: 'The keep alive functionality assures that the connection is still open and both broker and client are connected to one another. Therefore the client specifies a time interval in seconds and communicates it to the broker during the establishment of the connection. The interval is the longest possible period of time, which broker and client can endure without sending a message.',
        type: 'text',
        placeholder: '5000',
        required: false,
        flex: "50"
       }, {
        key: 'connect.mqtt.connection.ssl.ca.cert',
        value: '',
        label: 'CA certificate file path',
        tooltip: 'Provides the path to the CA certificate file to use with the Mqtt connection',
        type: 'text',
        placeholder: 'CA/certificate/path',
        required: false,
        flex: "50"
       }, {
        key: 'connect.mqtt.converter.throw.on.error',
        value: '',
        label: 'Throw error on conversion',
        tooltip: 'If set to false the conversion exception will be swallowed and everything carries on BUT the message is lost!!; true will throw the exception.Default is false.',
        type: 'text',
        placeholder: 'throw',
        required: false,
        flex: "50"
       }, {
        key: 'connect.mqtt.source.converters',
        value: '',
        label: 'Converter class',
        tooltip: 'Contains a tuple (Mqtt source topic and the canonical class name for the converter of a raw Mqtt message bytes to a SourceRecord).If the source topic is not matched it will default to the BytesConverter/i.e. $mqtt_source1=com.datamountaineer.streamreactor.connect.mqtt.source.converters.AvroConverter;$mqtt_source2=com.datamountaineer.streamreactor.connect.mqtt.source.converters.JsonConverter""".stripMargin',
        type: 'text',
        placeholder: 'com.datamountaineer.streamreactor.connect.converters.source.AvroConverter',
        required: false,
        flex: "50"
       }]
      }



     ] //end of sections
   }]
 }
];

var defaultConnectorInfo = {
 name: "unknown",
 type: "",
 color: "",
 class: "",
 type: "unknown"
};
