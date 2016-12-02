//Change the URLs of the endpoints here
var clusters = [
   {
     NAME:"prod",
     KAFKA_CONNECT: "http://kafka-connect.prod.url",
     KAFKA_TOPICS_UI: "http://kafka-topics-ui.url",
     KAFKA_TOPICS_UI_ENABLED: true ,
     COLOR: "#141414"
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