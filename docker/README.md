## Kafka Connect UI ##

[![](https://images.microbadger.com/badges/image/landoop/kafka-connect-ui.svg)](http://microbadger.com/images/landoop/kafka-connect-ui)

This is a small docker image for Landoop's kafka-connect-ui.
It serves the kafka-connect-ui from port 8000.
A live version can be found at <https://kafka-connect-ui.landoop.com>

The software is stateless and the only necessary option is your Kafka Connect
URL:

    docker run --rm -it -p 8000:8000 \
               -e "CONNECT_URL=http://connect.distributed.url" \
               landoop/kafka-topics-ui

Visit http://localhost:8000 to see the UI.

Please note that because Connect does not send CORS headers, we have to proxy
it. What this means for you, is that Connect, while running the container, is
accessible via `http://your.address:8000/api/kafka-connect`. If this is a
security issue for you, you should protect your machine via a firewall, or maybe
do not expose the port and use the container's IP address to access the UI.
