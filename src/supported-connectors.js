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
    docs: "//docs.datamountaineer.com/en/latest/yahoo.html",
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
    class: "com.datamountaineer.streamreactor.connect.ftp.FtpSourceConnector",
    docs: "//docs.datamountaineer.com/en/latest/ftp-source.html",
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
    docs: "//docs.datamountaineer.com/en/latest/blockchain.html",
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
    docs: "//docs.datamountaineer.com/en/latest/cassandra-source.html",
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
    docs: "//docs.datamountaineer.com/en/latest/bloomberg.html",
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
    docs: "//docs.datamountaineer.com/en/latest/jms-source.html",
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
    docs: "//docs.datamountaineer.com/en/latest/mqtt.html",
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
    docs: "//docs.datamountaineer.com/en/latest/rethink-source.html",
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
    docs: "//docs.datamountaineer.com/en/latest/coap-source.html",
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
    docs: "//docs.datamountaineer.com/en/latest/elastic.html",
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
    docs: "//docs.datamountaineer.com/en/latest/elastic5.html",
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
    docs: "//docs.datamountaineer.com/en/latest/mqtt-sink.html",
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
    docs: "//docs.datamountaineer.com/en/latest/cassandra-sink.html",
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
    docs: "//docs.datamountaineer.com/en/latest/influx.html",
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
    docs: "//docs.datamountaineer.com/en/latest/mongo-sink.html",
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
    docs: "//docs.datamountaineer.com/en/latest/hazelcast.html",
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
    docs: "//docs.datamountaineer.com/en/latest/azuredocdb-sink.html",
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
    docs: "//docs.datamountaineer.com/en/latest/redis.html",
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
    docs: "//docs.datamountaineer.com/en/latest/kudu.html",
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
    docs: "//docs.datamountaineer.com/en/latest/jms.html",
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
    docs: "//docs.datamountaineer.com/en/latest/voltdb.html",
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
    docs: "//docs.datamountaineer.com/en/latest/coap-sink.html",
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
    docs: "//docs.datamountaineer.com/en/latest/hbase.html",
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
    docs: "//docs.datamountaineer.com/en/latest/rethink.html",
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
  }
];

var defaultConnectorInfo = {
  name: "unknown",
  type: "unknown",
  color: "",
  class: "",
  docs: "unknown.html"
};
