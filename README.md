# kafka-connect-ui

[![release](http://github-release-version.herokuapp.com/github/landoop/kafka-connect-ui/release.svg?style=flat)](https://github.com/landoop/kafka-connect-ui/releases/latest)
[![docker](https://img.shields.io/docker/pulls/landoop/kafka-connect-ui.svg?style=flat)](https://hub.docker.com/r/landoop/kafka-connect-ui/)
[![Join the chat at https://gitter.im/Landoop/support](https://img.shields.io/gitter/room/nwjs/nw.js.svg?maxAge=2592000)](https://gitter.im/Landoop/support?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

This is a web tool for Kafka Connect for setting up and managing connectors for multiple connect clusters.

## Live Demo
[kafka-connect-ui.landoop.com](http://kafka-connect-ui.landoop.com)

## Run standalone with docker

<--TODO-->


## Build from source
```
    git clone https://github.com/Landoop/kafka-topics-ui.git
    cd kafka-topics-ui
    npm install
    http-server .
```
Web UI will be available at `http://localhost:8080`

### Nginx config

If you use `nginx` to serve this ui, let angular manage routing with
```
    location / {
        try_files $uri $uri/ /index.html =404;
        root /folder-with-kafka-connect-ui/;
    }
```

### Setup connect clusters

Use multiple Kafka Connect clusters in `env.js` :
```
var clusters = [
   {
     NAME:"prod", //unique name is required
     KAFKA_CONNECT: "http://kafka-connect.prod.url", //required
     KAFKA_REST: "http://kafka-rest.url", //optional
     KAFKA_TOPICS_UI: "http://kafka-topics-ui.url", //optional
     KAFKA_TOPICS_UI_ENABLED: true //optional
   },
   {
     NAME:"dev",
     KAFKA_CONNECT: "http://kafka-connect.dev.url",
     KAFKA_TOPICS_UI_ENABLED: false
   },
   {
     NAME:"local",
     KAFKA_CONNECT: "http://kafka-connect.local.url",
   }
]

```
### Supported Connectors
For all our DM connectors we have a template of metadata within the `supported-connectors.js`. However this optional and depends on your setup. In any case the UI will show all the connectors appear in your classpath kai give you all the required fields to set it up. 

## Changelog
[Here](https://github.com/Landoop/kafka-connect-ui/wiki/Release-Changelog)

## License

The project is licensed under the [BSL](www.landoop.com/bsl) license.

## Relevant Projects

* [schema-registry-ui](https://github.com/Landoop/schema-registry-ui), View, create, evolve and manage your Avro Schemas on your Kafka cluster
* [kafka-topics-ui](https://github.com/Landoop/kafka-topics-ui), UI to browse Kafka data and work with Kafka Topics                   
* [fast-data-dev](https://github.com/Landoop/fast-data-dev), Docker for Kafka developers (schema-registry,kafka-rest,zoo,brokers,landoop) 
* [Landoop-On-Cloudera](https://github.com/Landoop/Landoop-On-Cloudera), Install and manage your kafka streaming-platform on you Cloudera CDH cluster



<img src="http://www.landoop.com/images/landoop-dark.svg" width="13"> www.landoop.com
