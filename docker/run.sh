#!/bin/sh

PROXY="${PROXY:-true}"
RELOAD="${RELOAD:-false}"

PROXY_SKIP_VERIFY="${PROXY_SKIP_VERIFY:-false}"
INSECURE_PROXY=""
CADDY_OPTIONS="${CADDY_OPTIONS:-}"
RELATIVE_PROXY_URL="${RELATIVE_PROXY_URL:-false}"
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
        sed -e "s/8000/$PORT/" > /tmp/Caddyfile

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
            cat <<EOF >/tmp/env.js
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
            cat <<EOF >>/tmp/Caddyfile
proxy /api/$CLUSTER_SANITIZED_NAME $CLUSTER_URL {
    without /api/$CLUSTER_SANITIZED_NAME
    $INSECURE_PROXY
}
EOF
            if echo "$RELATIVE_PROXY_URL" | egrep -sq "true|TRUE|y|Y|yes|YES|1"; then
                CLUSTER_URL="api/$CLUSTER_SANITIZED_NAME"
            else
                CLUSTER_URL="/api/$CLUSTER_SANITIZED_NAME"
            fi

            cat <<EOF >>/tmp/env.js
   $OPEN_CURL
     NAME: "$CLUSTER_NAME",
     KAFKA_CONNECT: "$CLUSTER_URL"
   }
EOF
        else
            cat <<EOF >>/tmp/env.js
   $OPEN_CURL
     NAME: "$CLUSTER_NAME",
     KAFKA_CONNECT: "$CLUSTER_URL"
   }
EOF
        fi
    done
    echo "]" >> /tmp/env.js

    if [[ -n "${CADDY_OPTIONS}" ]]; then
        echo "Applying custom options to Caddyfile"
        cat <<EOF >>/tmp/Caddyfile
$CADDY_OPTIONS
EOF
    fi


    # Here we emulate the output by Caddy. Why? Because we can't
    # redirect caddy to stderr as the logging would also get redirected.
    cat <<EOF
Note: if you use a PORT lower than 1024, please note that kafka-connect-ui can
now run under any user. In the future a non-root user may become the default.
In this case you will have to explicitly allow binding to such ports, either by
setting the root user or something like '--sysctl net.ipv4.ip_unprivileged_port_start=0'.

Activating privacy features... done.
http://0.0.0.0:$PORT
EOF
} 1>&2

if echo "$RELOAD" | egrep -sq "true|TRUE|y|Y|yes|YES|1"; then
    echo "Enabling watch on caddy config file."
    ./wait.sh&
    exec /caddy/caddy -conf /tmp/Caddyfile -quiet
else
    exec /caddy/caddy -conf /tmp/Caddyfile -quiet
fi



