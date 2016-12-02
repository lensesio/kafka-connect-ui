#!/bin/sh

CONNECT_PROXY=/api/kafka-connect

if [[ -z "$CONNECT_URL" ]]; then
    echo "Kafka Connect URL was not set via CONNECT_URL environment variable."
    echo "We will fall back to default http://localhost:8083 which probably won't work."
    # We also change connect proxy in order to make it as visible as possible
    # that the configuration is bad.
    CONNECT_PROXY=http://localhost:8083
fi

CONNECT_URL="${CONNECT_URL:-http://localhost:8083}"

echo
echo "Enabling proxy because Connect doesn't send CORS headers yet."
cat <<EOF >>/caddy/Caddyfile
proxy /api/kafka-connect $CONNECT_URL {
    without /api/kafka-connect
}
EOF

CONNECT_URL=/api/kafka-rest-proxy

cat <<EOF >/kafka-connect-ui/env.js
var clusters = [
   {
     NAME: "default",
     KAFKA_CONNECT: "$CONNECT_PROXY"
   }
]
EOF

echo

exec /caddy/caddy -conf /caddy/Caddyfile
