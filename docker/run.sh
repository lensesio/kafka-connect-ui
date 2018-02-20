#!/bin/sh

PROXY="${PROXY:-true}"
PROXY_SKIP_VERIFY="${PROXY_SKIP_VERIFY:-false}"
INSECURE_PROXY=""
CADDY_OPTIONS="${CADDY_OPTIONS:-}"
PORT="${PORT:-8000}"

{
    echo "Landoop Kafka Connect UI ${KAFKA_CONNECT_UI_VERSION}"
    echo "Visit <https://github.com/Landoop/kafka-connect-ui/tree/master/docker>"
    echo "to find more about how you can configure this container."
    echo

    if [[ -z "$CONNECT_URL" ]]; then
        echo "Kafka Connect URL was not set via CONNECT_URL environment variable."
        echo "We will fall back to default http://localhost:8083 which probably won't work."
        echo
    fi
    CONNECT_URL="${CONNECT_URL:-http://localhost:8083}"

    cat /caddy/Caddyfile.template |
        sed -e "s/8000/$PORT/" > /caddy/Caddyfile

    if echo "$PROXY" | egrep -sq "true|TRUE|y|Y|yes|YES|1"; then
        echo "Enabling proxy. You can disable this via PROXY=false."
    fi

    if echo "$PROXY_SKIP_VERIFY" | egrep -sq "true|TRUE|y|Y|yes|YES|1"; then
        INSECURE_PROXY=insecure_skip_verify
    fi

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
        if echo $PROXY | egrep -sq "true|TRUE|y|Y|yes|YES|1"; then
            cat <<EOF >>/caddy/Caddyfile
proxy /api/$CLUSTER_SANITIZED_NAME $CLUSTER_URL {
    without /api/$CLUSTER_SANITIZED_NAME
    $INSECURE_PROXY
}
EOF
            cat <<EOF >>/kafka-connect-ui/env.js
   $OPEN_CURL
     NAME: "$CLUSTER_NAME",
     KAFKA_CONNECT: "/api/$CLUSTER_SANITIZED_NAME"
   }
EOF
        else
            cat <<EOF >>/kafka-connect-ui/env.js
   $OPEN_CURL
     NAME: "$CLUSTER_NAME",
     KAFKA_CONNECT: "$CLUSTER_URL"
   }
EOF
        fi
    done
    echo "]" >> /kafka-connect-ui/env.js

    if [[ -n "${CADDY_OPTIONS}" ]]; then
        echo "Applying custom options to Caddyfile"
        cat <<EOF >>/caddy/Caddyfile
$CADDY_OPTIONS
EOF
    fi


    # Here we emulate the output by Caddy. Why? Because we can't
    # redirect caddy to stderr as the logging would also get redirected.
    echo
    echo "Activating privacy features... done."
    echo "http://0.0.0.0:$PORT"
} 1>&2


exec /caddy/caddy -conf /caddy/Caddyfile -quiet
