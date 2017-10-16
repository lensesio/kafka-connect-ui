#!/bin/sh

if [[ -z "$CONNECT_URL" ]]; then
    echo "Kafka Connect URL was not set via CONNECT_URL environment variable."
    echo "We will fall back to default http://localhost:8083 which probably won't work."
    # We also change connect proxy in order to make it as visible as possible
    # that the configuration is bad.
    CONNECT_PROXY=http://localhost:8083
fi

CONNECT_URL="${CONNECT_URL:-http://localhost:8083}"

cat /caddy/Caddyfile.template > /caddy/Caddyfile

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

    CLUSTER_URL="$(echo "$cluster" | sed -e 's/;.*//')"
    CLUSTER_NAME="$(echo "$cluster" | grep ';' | sed -e 's/.*;//')"
    if [[ -z "$CLUSTER_NAME" ]]; then
        # if no name is provided, use this
        CLUSTER_NAME="kafka-connect-$NUM_CLUSTER"
        CLUSTER_SANITIZED_NAME="${CLUSTER_NAME}"
    else
        # if a name is provided, sanitize it
        CLUSTER_SANITIZED_NAME="${CLUSTER_NAME// /_}"
        CLUSTER_SANITIZED_NAME="${CLUSTER_NAME//[^a-zA-Z0-9_.-]/}"
    fi
    cat <<EOF >>/caddy/Caddyfile
proxy /api/$CLUSTER_SANITIZED_NAME $CLUSTER_URL {
    without /api/$CLUSTER_SANITIZED_NAME
}
EOF

    cat <<EOF >>/kafka-connect-ui/env.js
   $OPEN_CURL
     NAME: "$CLUSTER_NAME",
     KAFKA_CONNECT: "/api/$CLUSTER_SANITIZED_NAME"
   }
EOF

done
echo "]" >> /kafka-connect-ui/env.js

echo

exec /caddy/caddy -conf /caddy/Caddyfile
