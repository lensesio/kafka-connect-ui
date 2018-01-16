var supportedConnectorsTemplates = [
  {
    name: "Twitter",
    icon: 'twitter.png',
    description: 'Use the Twitter API to stream data into Kafka',
    type: "Source",
    uiEnabled: true,
    color: "#1da1f3",
    class: "com.eneco.trading.kafka.connect.twitter.TwitterSourceConnector",
    docs: "https://github.com/Eneco/kafka-connect-twitter",
    author:'Eneco'
  },
  {
    name: "Yahoo Finance",
    type: "Source",
    icon: "yahoofinance.png",
    description: "Stream stock and currency exchange rates into Kafka",
    uiEnabled: true,
    color: "#30007b",
    class: "com.datamountaineer.streamreactor.connect.yahoo.source.YahooSourceConnector",
    docs: "//lenses.stream/connectors/source/yahoo.html",
    author:'Landoop - Stream Reactor'
  },
  {
    name: "File",
    icon: "file.png",
    description: "Tail files or folders and stream data into Kafka",
    type: "Source",
    uiEnabled: true,
    color: "#bbb2b2",
    class: "org.apache.kafka.connect.file.FileStreamSourceConnector",
    author:'Apache Kafka'
  },
  {
    name: "Ftp",
    icon: "ftp.png",
    description: "Tail remote FTP folders and bring messages in Kafka",
    type: "Source",
    uiEnabled: true,
    color: "#b1b1b1",
    class: "com.datamountaineer.streamreactor.connect.ftp.source.FtpSourceConnector",
    docs: "//lenses.stream/connectors/source/ftp.html",
    author:'Landoop - Stream Reactor'
  },
  {
    name: "SQL",
    icon: "database.png",
    type: "Source",
    uiEnabled: true,
    color: "#b1b1b1",
    class: "com.landoop.connect.SQL",
    author:'Landoop - Stream Reactor'
  },
  {
    name: "Blockchain",
    icon: "blockchain-logo.jpg",
    description: "Get blockchain.info data into Kafka",
    type: "Source",
    uiEnabled: true,
    color: "#b1b1b1",
    class: "com.datamountaineer.streamreactor.connect.blockchain.source.BlockchainSourceConnector",
    docs: "//lenses.stream/connectors/source/blockchain.html",
    author:'Landoop - Stream Reactor'
  },
  {
    name: "Jdbc",
    icon: "database.png",
    description: "Stream data from SQL server into Kafka",
    type: "Source",
    uiEnabled: true,
    color: "#b1b1b1",
    class: "io.confluent.connect.jdbc.JdbcSourceConnector",
    author:'Confluent'
  },
  {
    name: "Cassandra",
    icon: "cassandra.jpg",
    description: "Extract Cassandra data using the CQL driver into Kafka",
    uiEnabled: true,
    type: "Source",
    color: "",
    class: "com.datamountaineer.streamreactor.connect.cassandra.source.CassandraSourceConnector",
    docs: "//lenses.stream/connectors/source/cassandra.html",
    author:'Landoop - Stream Reactor'
  },
  {
    name: "CassandraCDC",
    icon: "cassandra.jpg",
    description: "Extract Cassandra data using the CQL driver into Kafka",
    uiEnabled: true,
    type: "Source",
    color: "",
    class: "com.datamountaineer.streamreactor.connect.cassandra.cdc.CassandraCdcSourceConnector",
    docs: "//lenses.stream/connectors/source/cassandra-cdc.html",
    author:'Landoop - Stream Reactor'
  },
  {
    name: "Bloomberg",
    icon: "bloomberg.png",
    description: "Use the Bloomberg API to stream data into Kafka",
    type: "Source",
    uiEnabled: true,
    color: "#a65674",
    class: "com.datamountaineer.streamreactor.connect.bloomberg.BloombergSourceConnector",
    docs: "//lenses.stream/connectors/source/bloomberg.html",
    author:'Landoop - Stream Reactor'
  },
  {
    name: "JMS",
    icon: "jms.png",
    description: "Get data from JMS into Kafka",
    type: "Source",
    uiEnabled: true,
    color: "pink",
    class: "com.datamountaineer.streamreactor.connect.jms.source.JMSSourceConnector",
    docs: "//lenses.stream/connectors/source/jms.html",
    author:'Landoop - Stream Reactor'
  },
  {
    name: "MQTT",
    icon: "mqtt.png",
    description: "Read data from MQTT and write them into Kafka",
    type: "Source",
    uiEnabled: true,
    color: "#5B346C",
    class: "com.datamountaineer.streamreactor.connect.mqtt.source.MqttSourceConnector",
    docs: "//lenses.stream/connectors/source/mqtt.html",
    author:'Landoop - Stream Reactor'
  },
  {
    name: "RethinkDB",
    type: "Source",
    icon: "rethink.png",
    description: "Source records from RethinkDB into Kafka",
    color: "#4A3A41",
    uiEnabled: true,
    class: "com.datamountaineer.streamreactor.connect.rethink.source.ReThinkSourceConnector",
    docs: "//lenses.stream/connectors/source/rethink.html",
    author:'Landoop - Stream Reactor'
  },
  {
    name: "CoAP",
    type: "Source",
    icon: "coap.png",
    description: "Get Constrained Application Protocol data into Kafka",
    color: "#3A3A3A",
    uiEnabled: true,
    class: "com.datamountaineer.streamreactor.connect.coap.source.CoapSourceConnector",
    docs: "//lenses.stream/connectors/source/coap.html",
    author:'Landoop - Stream Reactor'
  },
  {
    name: "Pulsar",
    type: "Source",
    icon: "pulsar-logo.png",
    description: "Get data from Pulsar into Kafka",
    color: "#3A3A3A",
    uiEnabled: true,
    class: "com.datamountaineer.streamreactor.connect.pulsar.source.PulsarSourceConnector",
    docs: "//lenses.stream/connectors/source/pulsar.html",
    author:'Landoop - Stream Reactor'
  },
  {
    name: "Schemas",
    type: "Source",
    icon: "avro.svg",
    description: "Store Avro schemas in HDFS",
    color: "#3A3A3A",
    uiEnabled: true,
    class: "io.confluent.connect.hdfs.tools.SchemaSourceConnector",
    author:'Confluent'
  },
  {
    name: "Schemas",
    type: "Source",
    icon: "avro.svg",
    description: "Get Avro schemas into Kafka",
    color: "#3A3A3A",
    uiEnabled: true,
    class: "io.confluent.connect.storage.tools.SchemaSourceConnector",
    author:'Confluent'
  },
  {
    name: "Kafka Replicator",
    type: "Source",
    icon: "replicate.png",
    description: "Replicate data to another Kafka cluster",
    color: "#3A3A3A",
    uiEnabled: true,
    class: "io.confluent.connect.replicator.ReplicatorSourceConnector",
    author:'Confluent'
  },

  {
    name: "Elastic Search",
    color: "#5CB85C",
    icon: "elastic.png",
    description: "Write data from Kafka to Elastic Search",
    type: "Sink",
    uiEnabled: true,
    class: "com.datamountaineer.streamreactor.connect.elastic.ElasticSinkConnector",
    docs: "//lenses.stream/connectors/sink/elastic.html",
    author:'Landoop - Stream Reactor'
  },
  {
    name: "Elastic 5",
    color: "#5CB85C",
    icon: "elastic.png",
    description: "Write data from Kafka to Elastic Search",
    type: "Sink",
    uiEnabled: true,
    class: "com.datamountaineer.streamreactor.connect.elastic5.ElasticSinkConnector",
    docs: "//lenses.stream/connectors/sink/elastic5.html",
    author:'Landoop - Stream Reactor'
  },
  {
    name: "MQTT",
    color: "#5CB85C",
    icon: "mqtt.png",
    description: "A Connector and Sink to stream messages from Kafka to a MQTT brokers",
    type: "Sink",
    uiEnabled: true,
    class: "com.datamountaineer.streamreactor.connect.mqtt.sink.MqttSinkConnector",
    docs: "//lenses.stream/connectors/sink/mqtt.html",
    author:'Landoop - Stream Reactor'
  },
  {
    name: "Cassandra",
    icon: "cassandra.jpg",
    description: "Store Kafka data into Cassandra",
    uiEnabled: true,
    type: "Sink",
    color: "#1a9f85",
    class: "com.datamountaineer.streamreactor.connect.cassandra.sink.CassandraSinkConnector",
    docs: "//lenses.stream/connectors/sink/cassandra.html",
    author:'Landoop - Stream Reactor'
  },
  {
    name: "InfluxDB",
    icon: "influxdb.jpg",
    description: "Store Kafka data into InfluxDB",
    uiEnabled: true,
    type: "Sink",
    color: "#0090BA",
    class: "com.datamountaineer.streamreactor.connect.influx.InfluxSinkConnector",
    docs: "//lenses.stream/connectors/sink/influx.html",
    author:'Landoop - Stream Reactor'
  },
  {
    name: "MongoDB",
    type: "Sink",
    icon: "mongodb.png",
    description: "Write Kafka data into MongoDB",
    color: "#609959",
    uiEnabled: true,
    class: "com.datamountaineer.streamreactor.connect.mongodb.sink.MongoSinkConnector",
    docs: "//lenses.stream/connectors/sink/mongo.html",
    author:'Landoop - Stream Reactor'
  },
  {
    name: "HazelCast",
    type: "Sink",
    description: "Store Kafka data into HazelCast (RingBuffer)",
    icon: "hazelcast.png",
    uiEnabled: true,
    color: "#002A36",
    class: "com.datamountaineer.streamreactor.connect.hazelcast.sink.HazelCastSinkConnector",
    docs: "//lenses.stream/connectors/sink/hazelcast.html",
    author:'Landoop - Stream Reactor'
  },
  {
    name: "Pulsar",
    type: "Sink",
    icon: "pulsar-logo.png",
    description: "Write Kafka data into Pulsar",
    color: "#3A3A3A",
    uiEnabled: true,
    class: "com.datamountaineer.streamreactor.connect.pulsar.sink.PulsarSinkConnector",
    docs: "//lenses.stream/connectors/sink/pulsar.html",
    author:'Landoop - Stream Reactor'
  },
  {
    name: "Jdbc",
    icon: 'database.png',
    description: 'Store Kafka data into SQL',
    type: "Sink",
    uiEnabled: true,
    color: "#D8291F",
    class: "io.confluent.connect.jdbc.JdbcSinkConnector",
    author:'Confluent'
  },
  {
    name: "Amazon S3",
    type: "Sink",
    icon: "s3.png",
    description: "Store Kafka data into Amazon S3",
    color: "#3A3A3A",
    uiEnabled: true,
    class: "io.confluent.connect.s3.S3SinkConnector",
    author:'Confluent'
  },
  {
    name: "DocumentDB",
    type: "Sink",
    icon: "documentdb.png",
    description: "Write Kafka data into Azure Document DB",
    color: "#3A3A3A",
    uiEnabled: true,
    class: "com.datamountaineer.streamreactor.connect.azure.documentdb.sink.DocumentDbSinkConnector",
    docs: "//lenses.stream/connectors/sink/azuredocdb.html",
    author:'Landoop - Stream Reactor'
  },
  {
    name: "Redis",
    icon: 'redis.png',
    description: 'Store Kafka data into Redis Sorted Sets/Key-Value',
    type: "Sink",
    uiEnabled: true,
    color: "#D8291F",
    class: "com.datamountaineer.streamreactor.connect.redis.sink.RedisSinkConnector",
    docs: "//lenses.stream/connectors/sink/redis.html",
    author:'Landoop - Stream Reactor'
  },
  {
    name: "Kudu",
    icon: 'kudu.png',
    type: "Sink",
    description: "Write Kafka data into Kudu",
    uiEnabled: true,
    color: "#549998",
    class: "com.datamountaineer.streamreactor.connect.kudu.sink.KuduSinkConnector",
    docs: "//lenses.stream/connectors/sink/kudu.html",
    author:'Landoop - Stream Reactor'
  },
  {
    name: "JMS",
    type: "Sink",
    icon: "jms.png",
    description: "Store Kafka data into a JMS topic/queue",
    uiEnabled: true,
    color: "#879171",
    class: "com.datamountaineer.streamreactor.connect.jms.sink.JMSSinkConnector",
    docs: "//lenses.stream/connectors/sink/jms.html",
    author:'Landoop - Stream Reactor'
  },
  {
    name: "HDFS",
    type: "Sink",
    description: "Write Kafka data into HDFS",
    icon: "hdfs.png",
    uiEnabled: true,
    color: "#ffcccc",
    class: "io.confluent.connect.hdfs.HdfsSinkConnector",
    author:'Confluent'
  }, {
    name: "VoltDB",
    type: "Sink",
    icon: "voltdb.png",
    uiEnabled: true,
    description: 'A sink connector to write Kafka data into VoltDB',
    color: "#e8371b",
    class: "com.datamountaineer.streamreactor.connect.voltdb.VoltSinkConnector",
    docs: "6.3.15. VoltDB",
    author:'Landoop - Stream Reactor'
  },
  {
    name: "File",
    icon: "file.png",
    description: "Store Kafka data into files",
    type: "Sink",
    uiEnabled: true,
    color: "#b1b1b1",
    class: "org.apache.kafka.connect.file.FileStreamSinkConnector",
    author:'Apache Kafka'
  },
  {
    name: "CoAP",
    type: "Sink",
    icon: "coap.png",
    description: "Transfer Kafka data into Constrained Application Protocol service",
    color: "#3A3A3A",
    uiEnabled: true,
    class: "com.datamountaineer.streamreactor.connect.coap.sink.CoapSinkConnector",
    docs: "//lenses.stream/connectors/sink/coap.html",
    author:'Landoop - Stream Reactor'
  },
  {
    name: "HBase",
    icon: "hbase.svg",
    type: "Sink",
    description: "Write Kafka data into HBase",
    uiEnabled: true,
    color: "#6d1c7c",
    class: "com.datamountaineer.streamreactor.connect.hbase.HbaseSinkConnector",
    docs: "//lenses.stream/connectors/sink/hbase.html",
    author:'Landoop - Stream Reactor'
  },
  {
    name: "RethinkDB",
    type: "Sink",
    icon: "rethink.png",
    description: "Store Kafka data into RethinkDb",
    uiEnabled: true,
    color: "#4A3A41",
    class: "com.datamountaineer.streamreactor.connect.rethink.sink.ReThinkSinkConnector",
    docs: "//lenses.stream/connectors/sink/rethink.html",
    author:'Landoop - Stream Reactor'
  },
  {
    name: "Elastic Search",
    type: "Sink",
    icon: "elastic.png",
    description: "Write Kafka data into Elastic Search",
    uiEnabled: true,
    color: "#4A3A41",
    class: "io.confluent.connect.elasticsearch.ElasticsearchSinkConnector",
    author:'Confluent'
  }, {
    name: "Druid",
    type: "Sink",
    icon: "druid.png",
    description: "Write Kafka data into Apache Druid Search",
    uiEnabled: true,
    color: "#4A3A41",
    class: "com.datamountaineer.streamreactor.connect.druid.DruidSinkConnector",
    author:'Landoop - Stream Reactor'
  },
  {
    name: "Twitter",
    type: "Sink",
    icon: "twitter.png",
    description: "Push Kafka events to Twitter",
    uiEnabled: true,
    color: "#4A3A41",
    class: "com.eneco.trading.kafka.connect.twitter.TwitterSinkConnector",
    docs: "https://github.com/Eneco/kafka-connect-twitter",
    author:'Eneco'
  }];

  var defaultConnectorInfo = {
    name: "unknown",
    type: "unknown",
    color: "",
    class: "",
    docs: "unknown.html"
  };
  