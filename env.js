//Change the URLs of the endpoints here
var clusters = [
   {
     NAME:"prod",
     KAFKA_CONNECT: "http://kafka-connect.prod.url",
     KAFKA_REST: "http://kafka-rest.url",
     KAFKA_TOPICS_UI: "http://kafka-topics-ui.url",
     KAFKA_TOPICS_UI_ENABLED: true
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