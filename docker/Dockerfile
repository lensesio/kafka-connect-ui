FROM alpine
MAINTAINER Marios Andreopoulos <marios@landoop.com>

WORKDIR /
# Add needed tools
RUN apk add --no-cache ca-certificates wget \
    && echo "progress = dot:giga" | tee /etc/wgetrc

# Add and Setup Caddy webserver
RUN wget "https://caddyserver.com/download/build?os=linux&arch=amd64&features=" -O /caddy.tgz \
    && mkdir caddy \
    && tar xzf caddy.tgz -C /caddy \
    && rm -f /caddy.tgz

# Add and Setup Kafka-Connect-Ui
ARG CONNECT_UI_URL=https://github.com/Landoop/kafka-connect-ui/releases/download/v.0.9.0/kafka-connect-ui-0.9.0.tar.gz
RUN wget "${CONNECT_UI_URL}" -O /kafka-connect-ui.tar.gz \
    && mkdir /kafka-connect-ui \
    && tar xzf /kafka-connect-ui.tar.gz -C /kafka-connect-ui \
    && rm -f /kafka-connect-ui.tar.gz

# Add configuration and runtime files
ADD Caddyfile /caddy/
ADD run.sh /
RUN chmod +x /run.sh

EXPOSE 8000
ENTRYPOINT ["/run.sh"]
