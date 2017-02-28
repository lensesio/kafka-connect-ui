## Kafka Connect UI ##

[![](https://images.microbadger.com/badges/image/landoop/kafka-connect-ui.svg)](http://microbadger.com/images/landoop/kafka-connect-ui)

This is a small docker image for Landoop's kafka-connect-ui.
It serves the kafka-connect-ui from port 8000.
A live version can be found at <https://kafka-connect-ui.landoop.com>

The software is stateless and the only necessary option is your Kafka Connect
URL:

    docker run --rm -it -p 8000:8000 \
               -e "CONNECT_URL=http://connect.distributed.url" \
               landoop/kafka-connect-ui

Visit http://localhost:8000 to see the UI.

The `CONNECT_URL` can be a comma separated array of Connect worker
endpoints. E.g: `CONNECT_URL=http://connect.1.url,http://connect.2.url"`

> **Important**: For the `CONNECT_URL` you have to use an IP address or a domain
> that can be resolved to it. **You can't use** `localhost` even if you serve
> Connect's REST port from your localhost. The reason for this is that a docker
> container has its own network, so your _localhost_ is different from the
> container's _localhost_. As an example, if you are in your home network and
> have an IP address of `192.168.5.65` and run Connect from your computer,
> instead of `http://127.0.1:8083` you must use `http://192.168.5.65:8083`.

Please note that because Connect does not send CORS headers, we have to proxy
it. What this means for you, is that Connect, while running the container, is
accessible via `http://your.address:8000/api/kafka-connect`. If this is a
security issue for you, you should protect your machine via a firewall, or maybe
do not expose the port and use the container's IP address to access the UI.
