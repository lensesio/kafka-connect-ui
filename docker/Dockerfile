FROM alpine
MAINTAINER Marios Andreopoulos <marios@landoop.com>

WORKDIR /
# Add needed tools
RUN apk add --no-cache ca-certificates wget \
    && echo "progress = dot:giga" | tee /etc/wgetrc

# Add and Setup Caddy webserver
RUN wget "https://github.com/mholt/caddy/releases/download/v0.10.11/caddy_v0.10.11_linux_amd64.tar.gz" -O /caddy.tgz \
    && mkdir caddy \
    && tar xzf caddy.tgz -C /caddy --no-same-owner \
    && rm -f /caddy.tgz

# Add and Setup Kafka Connect UI
ARG KAFKA_CONNECT_UI_VERSION="0.9.7"
ARG KAFKA_CONNECT_UI_URL="https://github.com/Landoop/kafka-connect-ui/releases/download/v.${KAFKA_CONNECT_UI_VERSION}/kafka-connect-ui-${KAFKA_CONNECT_UI_VERSION}.tar.gz"
RUN wget "$KAFKA_CONNECT_UI_URL" -O /kafka-connect-ui.tar.gz \
    && mkdir /kafka-connect-ui \
    && tar xzf /kafka-connect-ui.tar.gz -C /kafka-connect-ui --no-same-owner \
    && rm -f /kafka-connect-ui.tar.gz \
    && rm -f /kafka-connect-ui/env.js \
    && ln -s /tmp/env.js /kafka-connect-ui/env.js

# Add configuration and runtime files
ADD Caddyfile /caddy/Caddyfile.template
ADD run.sh /
RUN chmod +x /run.sh

EXPOSE 8000

# USER nobody:nogroup
ENTRYPOINT ["/run.sh"]
