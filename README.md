# kafka-connect-ui

[![release](http://github-release-version.herokuapp.com/github/landoop/kafka-connect-ui/release.svg?style=flat)](https://github.com/landoop/kafka-connect-ui/releases/latest)
[![docker](https://img.shields.io/docker/pulls/landoop/kafka-connect-ui.svg?style=flat)](https://hub.docker.com/r/landoop/kafka-connect-ui/)
[![Join the chat at https://gitter.im/Landoop/support](https://img.shields.io/gitter/room/nwjs/nw.js.svg?maxAge=2592000)](https://gitter.im/Landoop/support?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

This is a web tool for Kafka Connect for setting up and managing connectors for multiple connect clusters.

## Live Demo
[kafka-connect-ui.landoop.com](http://kafka-connect-ui.landoop.com)

## Run standalone with docker

```
docker run --rm -it -p 8000:8000 \
           -e "CONNECT_URL=http://connect.distributed.url" \
           landoop/kafka-connect-ui
```

The CONNECT_URL can be a comma separated array of Connect worker endpoints. E.g: CONNECT_URL=http://connect.1.url,http://connect.2.url"

Additionally you can assign custom names to your Connect clusters by appending a semicolon and the cluster name after the endpoint URL. E.g:

```"CONNECT_URL=http://connect.1.url;dev cluster,http://connect.2.url;production cluster"```
 
Web UI will be available at [localhost:8000](http://localhost:8000/)


## Build from source

```
git clone https://github.com/Landoop/kafka-connect-ui.git
cd kafka-connect-ui
npm install -g bower http-server
npm install
http-server -p 8080 .
```

Web UI will be available at [localhost:8080](http://localhost:8080/)

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
     KAFKA_TOPICS_UI: "http://kafka-topics-ui.url", //optional
     KAFKA_TOPICS_UI_ENABLED: true //optional
     COLOR: "#141414" //optional
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
* Use `KAFKA_TOPICS_UI` and `KAFKA_TOPICS_UI_ENABLED` to navigate to the relevant topic when you have [kafka-topics-ui](https://github.com/Landoop/kafka-topics-ui) installed.
* Use `COLOR` to set different header colors for each set up cluster.

### Supported Connectors
For our [25+ stream-reactor Kafka Connectors](http://www.landoop.com/kafka/connectors/) we have a template of metadata within the `supported-connectors.js`. In any case you will be shown all the existing connectors in your classpath with all the required fields to set them up.

## Changelog
[Here](https://github.com/Landoop/kafka-connect-ui/releases)

## License

The project is licensed under the [BSL](http://www.landoop.com/bsl) license.

## Relevant Projects

* [schema-registry-ui](https://github.com/Landoop/schema-registry-ui), View, create, evolve and manage your Avro Schemas on your Kafka cluster
* [kafka-topics-ui](https://github.com/Landoop/kafka-topics-ui), UI to browse Kafka data and work with Kafka Topics                   
* [fast-data-dev](https://github.com/Landoop/fast-data-dev), Docker for Kafka developers (schema-registry,kafka-rest,zoo,brokers,landoop) 
* [Landoop-On-Cloudera](https://github.com/Landoop/Landoop-On-Cloudera), Install and manage your kafka streaming-platform on you Cloudera CDH cluster



<img src="http://www.landoop.com/images/landoop-dark.svg" width="13"> www.landoop.com
