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
echo "Enabling proxy because Connect doesn't send CORS headers yet and setting up clusters."

NUM_CLUSTER=0
OLDIFS=""
IFS=","
for cluster in $CONNECT_URL; do
    OPEN_CURL=",{"
    let "NUM_CLUSTER+=1"
    if [[ "$NUM_CLUSTER" == 1 ]]; then
        OPEN_CURL="{"
        cat <<EOF >/kafka-connect-ui/env.js
var clusters = [
EOF
    fi

    cat <<EOF >>/caddy/Caddyfile
proxy $CONNECT_PROXY-$NUM_CLUSTER $cluster {
    without $CONNECT_PROXY-$NUM_CLUSTER
}
EOF

    cat <<EOF >>/kafka-connect-ui/env.js
   $OPEN_CURL
     NAME: "connect-$NUM_CLUSTER",
     KAFKA_CONNECT: "$CONNECT_PROXY-$NUM_CLUSTER"
   }
EOF

done
echo "]" >> /kafka-connect-ui/env.js

echo

exec /caddy/caddy -conf /caddy/Caddyfile
